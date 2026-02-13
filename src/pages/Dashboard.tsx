import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { Settings } from 'lucide-react';
import { Header } from '../components/Header';
import { SpendKPICard, InstallsKPICard, ROASKPICard, BreakevenKPICard } from '../components/KPICard';
import {
  defaultParams,
  generateROIPredictions,
  kpiMetrics as defaultKpiMetrics,
  modelMetrics,
  channelComparison as defaultChannelComparison,
  retentionData as defaultRetentionData,
} from '../data/mockData';
import type { PredictionParams, KPIMetrics, ChannelComparison, RetentionData } from '../types/analytics';
import type { ChannelMetric, DashboardTab } from '../types/ui';

const ROIChart = lazy(async () => {
  const mod = await import('../components/ROIChart');
  return { default: mod.ROIChart };
});

const ChannelChart = lazy(async () => {
  const mod = await import('../components/ChannelChart');
  return { default: mod.ChannelChart };
});

const RetentionChart = lazy(async () => {
  const mod = await import('../components/RetentionChart');
  return { default: mod.RetentionChart };
});

const PredictionSimulator = lazy(async () => {
  const mod = await import('../components/PredictionSimulator');
  return { default: mod.PredictionSimulator };
});

const ModelStatus = lazy(async () => {
  const mod = await import('../components/ModelStatus');
  return { default: mod.ModelStatus };
});

const ChannelTable = lazy(async () => {
  const mod = await import('../components/ChannelTable');
  return { default: mod.ChannelTable };
});

const DataConfigPanel = lazy(async () => {
  const mod = await import('../components/DataConfigPanel');
  return { default: mod.DataConfigPanel };
});

const chartFallback = <div className="chart-container">加载中...</div>;

const channelMetricOptions: Array<{ key: ChannelMetric; label: string }> = [
  { key: 'roas', label: 'ROAS' },
  { key: 'cpi', label: 'CPI' },
  { key: 'breakevenDays', label: '回本天数' },
  { key: 'ltv30', label: 'LTV30' },
];

const STORAGE_KEYS = {
  params: 'game-ad-roi:params',
  kpi: 'game-ad-roi:kpi',
  channels: 'game-ad-roi:channels',
  retention: 'game-ad-roi:retention',
} as const;

function loadStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [params, setParams] = useState<PredictionParams>(() =>
    loadStoredValue(STORAGE_KEYS.params, defaultParams),
  );
  const [channelMetric, setChannelMetric] = useState<ChannelMetric>('roas');
  const [showConfig, setShowConfig] = useState(false);

  const [kpiMetrics, setKpiMetrics] = useState<KPIMetrics>(() =>
    loadStoredValue(STORAGE_KEYS.kpi, defaultKpiMetrics),
  );
  const [channelComparison, setChannelComparison] = useState<ChannelComparison[]>(() =>
    loadStoredValue(STORAGE_KEYS.channels, defaultChannelComparison),
  );
  const [retentionData, setRetentionData] = useState<RetentionData[]>(() =>
    loadStoredValue(STORAGE_KEYS.retention, defaultRetentionData),
  );

  const roiPredictions = useMemo(() => generateROIPredictions(params), [params]);

  const breakevenDay = useMemo(() => {
    const breakpoint = roiPredictions.find((d) => d.breakeven);
    return breakpoint?.day ?? null;
  }, [roiPredictions]);

  const displayBreakevenDay = breakevenDay ?? kpiMetrics.predictedBreakeven;
  const predictedRoi = roiPredictions.length > 0 ? roiPredictions[roiPredictions.length - 1].roi : null;

  const handleParamsChange = useCallback((newParams: PredictionParams) => {
    setParams(newParams);
  }, []);

  const openConfig = useCallback(() => setShowConfig(true), []);
  const closeConfig = useCallback(() => setShowConfig(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.params, JSON.stringify(params));
  }, [params]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.kpi, JSON.stringify(kpiMetrics));
  }, [kpiMetrics]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.channels, JSON.stringify(channelComparison));
  }, [channelComparison]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.retention, JSON.stringify(retentionData));
  }, [retentionData]);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      void import('../components/ROIChart');
      void import('../components/RetentionChart');
      void import('../components/ChannelChart');
      void import('../components/ChannelTable');
      return;
    }

    if (activeTab === 'prediction') {
      void import('../components/PredictionSimulator');
      void import('../components/ROIChart');
      void import('../components/RetentionChart');
      return;
    }

    if (activeTab === 'channels') {
      void import('../components/ChannelChart');
      void import('../components/ChannelTable');
      return;
    }

    void import('../components/ModelStatus');
    void import('../components/DataConfigPanel');
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <div className="grid-bg" />
      <div className="glow-effect" />

      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {showConfig && (
        <Suspense fallback={null}>
          <DataConfigPanel
            kpiMetrics={kpiMetrics}
            channels={channelComparison}
            retentionData={retentionData}
            onKPIChange={setKpiMetrics}
            onChannelsChange={setChannelComparison}
            onRetentionChange={setRetentionData}
            onClose={closeConfig}
          />
        </Suspense>
      )}

      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={openConfig} className="btn-secondary flex items-center gap-2">
                <Settings className="w-4 h-4" />
                配置数据
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SpendKPICard value={`$${kpiMetrics.totalSpend.toLocaleString()}`} change={12.5} />
              <InstallsKPICard value={kpiMetrics.totalInstalls.toLocaleString()} change={8.3} />
              <ROASKPICard value={`${kpiMetrics.overallROAS}%`} change={5.2} />
              <BreakevenKPICard value={`${displayBreakevenDay}天`} change={-15} />
            </div>

            <Suspense fallback={chartFallback}>
              <ROIChart data={roiPredictions} breakevenDay={breakevenDay ?? undefined} />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Suspense fallback={chartFallback}>
                <RetentionChart data={retentionData} />
              </Suspense>
              <Suspense fallback={chartFallback}>
                <ChannelChart data={channelComparison} metric={channelMetric} />
              </Suspense>
            </div>

            <Suspense fallback={chartFallback}>
              <ChannelTable data={channelComparison} />
            </Suspense>
          </div>
        )}

        {activeTab === 'prediction' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">ROI预测模拟</h2>
              <p className="text-muted-foreground mt-1">调整参数，实时评估广告投放回本周期。</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Suspense fallback={chartFallback}>
                  <PredictionSimulator
                    params={params}
                    onParamsChange={handleParamsChange}
                    breakevenDay={breakevenDay}
                    predictedRoi={predictedRoi}
                  />
                </Suspense>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Suspense fallback={chartFallback}>
                  <ROIChart data={roiPredictions} breakevenDay={breakevenDay ?? undefined} />
                </Suspense>
                <Suspense fallback={chartFallback}>
                  <RetentionChart data={retentionData} />
                </Suspense>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'channels' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">渠道效果分析</h2>
                <p className="text-muted-foreground mt-1">对比不同渠道的投放质量与回收效率。</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {channelMetricOptions.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setChannelMetric(item.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      channelMetric === item.key
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : 'bg-muted text-muted-foreground hover:bg-card-hover'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <Suspense fallback={chartFallback}>
              <ChannelChart data={channelComparison} metric={channelMetric} />
            </Suspense>
            <Suspense fallback={chartFallback}>
              <ChannelTable data={channelComparison} />
            </Suspense>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">模型状态与配置</h2>
                <p className="text-muted-foreground mt-1">查看模型指标，并管理展示数据。</p>
              </div>
              <button onClick={openConfig} className="btn-primary flex items-center gap-2">
                <Settings className="w-4 h-4" />
                配置数据
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Suspense fallback={chartFallback}>
                <ModelStatus metrics={modelMetrics} />
              </Suspense>

              <div className="chart-container">
                <h3 className="text-lg font-semibold mb-4">预测模型架构</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-primary mb-2">数据层</h4>
                    采集广告平台的展示、点击、安装与花费数据，构建统一口径的分析输入。
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-accent mb-2">特征层</h4>
                    提取留存曲线、付费行为和时序波动特征，作为 ROI 预测输入。
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-warning mb-2">模型层</h4>
                    使用时序模型融合策略预测未来回收路径，输出回本点与 ROAS 趋势。
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-chart-5 mb-2">迭代层</h4>
                    持续对比预测与实际结果，滚动校准参数，提高不同渠道场景下的稳定性。
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">核心算法说明</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2">留存预测</h4>
                  <p className="text-muted-foreground mb-3">通过衰减曲线拟合用户在不同天数的活跃概率。</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">R(t) = alpha * e^(-beta*t) + gamma</code>
                </div>
                <div>
                  <h4 className="font-medium mb-2">LTV估计</h4>
                  <p className="text-muted-foreground mb-3">基于留存与 ARPU 估算累计价值，形成回收曲线。</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">LTV = integral(R(t) * ARPU(t), t)</code>
                </div>
                <div>
                  <h4 className="font-medium mb-2">回本点</h4>
                  <p className="text-muted-foreground mb-3">找到累计回收达到投放成本的最早时间点。</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">T_breakeven: LTV(T) = CPI</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
