import { useState } from 'react';
import { Settings, Plus, Trash2, Save } from 'lucide-react';
import type { KPIMetrics, ChannelComparison, RetentionData } from '../types/analytics';

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

export function DataConfigPanel({ 
  kpiMetrics, 
  channels, 
  retentionData,
  onKPIChange, 
  onChannelsChange,
  onRetentionChange,
  onClose 
}: DataConfigPanelProps) {
  const [activeTab, setActiveTab] = useState<'kpi' | 'channels' | 'retention'>('kpi');
  const [localKPI, setLocalKPI] = useState(kpiMetrics);
  const [localChannels, setLocalChannels] = useState(channels);
  const [localRetention, setLocalRetention] = useState(retentionData);

  const handleSave = () => {
    onKPIChange(localKPI);
    onChannelsChange(localChannels);
    onRetentionChange(localRetention);
    onClose();
  };

  const addChannel = () => {
    const newChannel: ChannelComparison = {
      channelId: `channel-${Date.now()}`,
      channelName: '新渠道',
      spend: 10000,
      installs: 5000,
      cpi: 2.0,
      ltv30: 3.0,
      roas: 150,
      breakevenDays: 30,
      color: channelColors[localChannels.length % channelColors.length],
    };
    setLocalChannels([...localChannels, newChannel]);
  };

  const removeChannel = (index: number) => {
    setLocalChannels(localChannels.filter((_, i) => i !== index));
  };

  const updateChannel = (index: number, field: keyof ChannelComparison, value: string | number) => {
    const updated = [...localChannels];
    updated[index] = { ...updated[index], [field]: value };
    // 自动计算 CPI
    if (field === 'spend' || field === 'installs') {
      const spend = field === 'spend' ? Number(value) : updated[index].spend;
      const installs = field === 'installs' ? Number(value) : updated[index].installs;
      if (installs > 0) {
        updated[index].cpi = Math.round((spend / installs) * 100) / 100;
      }
    }
    setLocalChannels(updated);
  };

  const updateRetention = (index: number, rate: number) => {
    const updated = [...localRetention];
    updated[index] = { ...updated[index], rate };
    setLocalRetention(updated);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in-up">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">数据配置</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        {/* 标签栏 */}
        <div className="flex border-b border-border">
          {[
            { id: 'kpi', label: 'KPI概览' },
            { id: 'channels', label: '渠道数据' },
            { id: 'retention', label: '留存率' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

        {/* 内容区 */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* KPI 配置 */}
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

          {/* 渠道配置 */}
          {activeTab === 'channels' && (
            <div className="space-y-4">
              {localChannels.map((channel, index) => (
                <div key={channel.channelId} className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: channel.color }}
                      />
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
                        readOnly
                        className="input-field text-sm py-1.5 bg-muted/50"
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

          {/* 留存率配置 */}
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

        {/* 底部按钮 */}
        <div className="flex justify-end gap-3 p-4 border-t border-border">
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
