import { useMemo, useRef, useState } from 'react';
import { Settings, Plus, Trash2, Save } from 'lucide-react';
import type { KPIMetrics, ChannelComparison, RetentionData } from '../types/analytics';
import type { ConfigTab } from '../types/ui';
import {
  kpiMetrics as defaultKpiMetrics,
  channelComparison as defaultChannelComparison,
  retentionData as defaultRetentionData,
} from '../data/mockData';

interface DataConfigPanelProps {
  kpiMetrics: KPIMetrics;
  channels: ChannelComparison[];
  retentionData: RetentionData[];
  onKPIChange: (kpi: KPIMetrics) => void;
  onChannelsChange: (channels: ChannelComparison[]) => void;
  onRetentionChange: (retention: RetentionData[]) => void;
  onClose: () => void;
}

const channelColors = ['#00b4d8', '#00f5a0', '#a855f7', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6'];

const tabs: Array<{ id: ConfigTab; label: string }> = [
  { id: 'kpi', label: 'KPI总览' },
  { id: 'channels', label: '渠道数据' },
  { id: 'retention', label: '留存率' },
];

function sanitizeNumber(value: number, min: number = 0): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, value);
}

function roundTo(value: number, digits: number = 2): number {
  const base = 10 ** digits;
  return Math.round(value * base) / base;
}

function normalizeChannel(channel: ChannelComparison): ChannelComparison {
  const spend = sanitizeNumber(channel.spend);
  const installs = sanitizeNumber(channel.installs);
  const cpi = installs > 0 ? roundTo(spend / installs, 2) : sanitizeNumber(channel.cpi);
  const ltv30 = sanitizeNumber(channel.ltv30);
  const roas = cpi > 0 ? roundTo((ltv30 / cpi) * 100, 1) : sanitizeNumber(channel.roas);

  return {
    ...channel,
    spend,
    installs,
    cpi,
    ltv30,
    roas,
    breakevenDays: roundTo(sanitizeNumber(channel.breakevenDays), 0),
  };
}

function deriveKPIFromChannels(channels: ChannelComparison[], fallback: KPIMetrics): KPIMetrics {
  if (channels.length === 0) return fallback;

  const totalSpend = channels.reduce((sum, item) => sum + sanitizeNumber(item.spend), 0);
  const totalInstalls = channels.reduce((sum, item) => sum + sanitizeNumber(item.installs), 0);
  const totalRevenue = channels.reduce(
    (sum, item) => sum + sanitizeNumber(item.spend) * (sanitizeNumber(item.roas) / 100),
    0,
  );

  const averageCPI = totalInstalls > 0 ? totalSpend / totalInstalls : fallback.averageCPI;
  const overallROAS = totalSpend > 0 ? (totalRevenue / totalSpend) * 100 : fallback.overallROAS;

  const weightedBreakeven =
    totalSpend > 0
      ? channels.reduce((sum, item) => sum + sanitizeNumber(item.breakevenDays) * sanitizeNumber(item.spend), 0) /
        totalSpend
      : fallback.predictedBreakeven;

  const weightedLtv =
    totalInstalls > 0
      ? channels.reduce((sum, item) => sum + sanitizeNumber(item.ltv30) * sanitizeNumber(item.installs), 0) /
        totalInstalls
      : fallback.currentLTV;

  return {
    ...fallback,
    totalSpend: roundTo(totalSpend, 0),
    totalInstalls: roundTo(totalInstalls, 0),
    totalRevenue: roundTo(totalRevenue, 0),
    averageCPI: roundTo(averageCPI, 2),
    overallROAS: roundTo(overallROAS, 1),
    predictedBreakeven: roundTo(weightedBreakeven, 0),
    currentLTV: roundTo(weightedLtv, 2),
  };
}

type ExportPayloadV1 = {
  version: 1;
  exportedAt: string;
  kpiMetrics: KPIMetrics;
  channels: ChannelComparison[];
  retentionData: RetentionData[];
};

export function DataConfigPanel({
  kpiMetrics,
  channels,
  retentionData,
  onKPIChange,
  onChannelsChange,
  onRetentionChange,
  onClose,
}: DataConfigPanelProps) {
  const [activeTab, setActiveTab] = useState<ConfigTab>('kpi');
  const [localKPI, setLocalKPI] = useState(kpiMetrics);
  const [localChannels, setLocalChannels] = useState(channels);
  const [localRetention, setLocalRetention] = useState(retentionData);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const nextColor = useMemo(
    () => channelColors[localChannels.length % channelColors.length],
    [localChannels.length],
  );

  const handleSave = () => {
    const sanitizedChannels = localChannels.map(normalizeChannel);
    const sanitizedRetention = localRetention
      .map((item) => ({ ...item, rate: roundTo(sanitizeNumber(item.rate), 1) }))
      .sort((a, b) => a.day - b.day);
    const mergedKPI = deriveKPIFromChannels(sanitizedChannels, localKPI);

    onKPIChange(mergedKPI);
    onChannelsChange(sanitizedChannels);
    onRetentionChange(sanitizedRetention);
    onClose();
  };

  const handleResetDefaults = () => {
    setLocalKPI(defaultKpiMetrics);
    setLocalChannels(defaultChannelComparison);
    setLocalRetention(defaultRetentionData);
    setImportError(null);
  };

  const handleExportConfig = () => {
    const payload: ExportPayloadV1 = {
      version: 1,
      exportedAt: new Date().toISOString(),
      kpiMetrics: localKPI,
      channels: localChannels,
      retentionData: localRetention,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    anchor.href = url;
    anchor.download = `game-ad-roi-config-${timestamp}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    setImportError(null);
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<ExportPayloadV1>;

      if (!parsed.kpiMetrics || !parsed.channels || !parsed.retentionData) {
        throw new Error('missing_fields');
      }
      if (!Array.isArray(parsed.channels) || !Array.isArray(parsed.retentionData)) {
        throw new Error('invalid_shape');
      }

      const normalizedChannels = parsed.channels.map(normalizeChannel);
      const normalizedRetention = parsed.retentionData
        .map((item) => ({
          ...item,
          day: roundTo(sanitizeNumber(item.day), 0),
          rate: roundTo(sanitizeNumber(item.rate), 1),
        }))
        .sort((a, b) => a.day - b.day);

      setLocalKPI(parsed.kpiMetrics);
      setLocalChannels(normalizedChannels);
      setLocalRetention(normalizedRetention);
      setImportError(null);
    } catch {
      setImportError('导入失败：请检查 JSON 文件格式是否正确。');
    } finally {
      event.target.value = '';
    }
  };

  const addChannel = () => {
    const newChannel: ChannelComparison = {
      channelId: `channel-${Date.now()}`,
      channelName: '新渠道',
      spend: 10000,
      installs: 5000,
      cpi: 2,
      ltv30: 3,
      roas: 150,
      breakevenDays: 30,
      color: nextColor,
    };
    setLocalChannels((prev) => [...prev, normalizeChannel(newChannel)]);
  };

  const removeChannel = (index: number) => {
    setLocalChannels((prev) => prev.filter((_, i) => i !== index));
  };

  const updateChannel = (index: number, field: keyof ChannelComparison, value: string | number) => {
    setLocalChannels((prev) => {
      const updated = [...prev];
      updated[index] = normalizeChannel({ ...updated[index], [field]: value });
      return updated;
    });
  };

  const updateRetention = (index: number, rate: number) => {
    setLocalRetention((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rate: roundTo(sanitizeNumber(rate), 1) };
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">数据配置</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ×
          </button>
        </div>

        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImportFile}
            className="hidden"
          />

          {importError && (
            <div className="mb-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
              {importError}
            </div>
          )}

          {activeTab === 'kpi' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">总投放花费 ($)</label>
                <input
                  type="number"
                  value={localKPI.totalSpend}
                  onChange={(e) => setLocalKPI({ ...localKPI, totalSpend: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">总安装量</label>
                <input
                  type="number"
                  value={localKPI.totalInstalls}
                  onChange={(e) => setLocalKPI({ ...localKPI, totalInstalls: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">总收入 ($)</label>
                <input
                  type="number"
                  value={localKPI.totalRevenue}
                  onChange={(e) => setLocalKPI({ ...localKPI, totalRevenue: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">平均 CPI ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={localKPI.averageCPI}
                  onChange={(e) => setLocalKPI({ ...localKPI, averageCPI: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">整体 ROAS (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={localKPI.overallROAS}
                  onChange={(e) => setLocalKPI({ ...localKPI, overallROAS: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">当前 LTV ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={localKPI.currentLTV}
                  onChange={(e) => setLocalKPI({ ...localKPI, currentLTV: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="space-y-4">
              {localChannels.map((channel, index) => (
                <div key={channel.channelId} className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                      <input
                        type="text"
                        value={channel.channelName}
                        onChange={(e) => updateChannel(index, 'channelName', e.target.value)}
                        className="bg-transparent border-none text-foreground font-medium focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => removeChannel(index)}
                      className="text-muted-foreground hover:text-danger transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">花费 ($)</label>
                      <input
                        type="number"
                        value={channel.spend}
                        onChange={(e) => updateChannel(index, 'spend', Number(e.target.value))}
                        className="input-field text-sm py-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">安装量</label>
                      <input
                        type="number"
                        value={channel.installs}
                        onChange={(e) => updateChannel(index, 'installs', Number(e.target.value))}
                        className="input-field text-sm py-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">CPI ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={channel.cpi}
                        onChange={(e) => updateChannel(index, 'cpi', Number(e.target.value))}
                        className="input-field text-sm py-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">LTV30 ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={channel.ltv30}
                        onChange={(e) => updateChannel(index, 'ltv30', Number(e.target.value))}
                        className="input-field text-sm py-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">ROAS (%)</label>
                      <input
                        type="number"
                        value={channel.roas}
                        onChange={(e) => updateChannel(index, 'roas', Number(e.target.value))}
                        className="input-field text-sm py-1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">回本天数</label>
                      <input
                        type="number"
                        value={channel.breakevenDays}
                        onChange={(e) => updateChannel(index, 'breakevenDays', Number(e.target.value))}
                        className="input-field text-sm py-1.5"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addChannel}
                className="w-full py-3 border border-dashed border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                添加渠道
              </button>
            </div>
          )}

          {activeTab === 'retention' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {localRetention.map((item, index) => (
                <div key={item.day} className="p-4 bg-muted/30 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground mb-2">D{item.day} 留存</p>
                  <div className="flex items-center justify-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={item.rate}
                      onChange={(e) => updateRetention(index, Number(e.target.value))}
                      className="input-field text-center text-lg font-mono w-20"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-border">
          <button onClick={handleResetDefaults} className="btn-secondary">
            恢复默认
          </button>
          <button onClick={handleImportClick} className="btn-secondary">
            导入 JSON
          </button>
          <button onClick={handleExportConfig} className="btn-secondary">
            导出 JSON
          </button>
          <button onClick={onClose} className="btn-secondary">
            取消
          </button>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            保存配置
          </button>
        </div>
      </div>
    </div>
  );
}

