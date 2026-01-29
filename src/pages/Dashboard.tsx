import { useState, useMemo, useCallback } from 'react';
import { Header } from '../components/Header';
import { SpendKPICard, InstallsKPICard, ROASKPICard, BreakevenKPICard } from '../components/KPICard';
import { ROIChart } from '../components/ROIChart';
import { ChannelChart } from '../components/ChannelChart';
import { RetentionChart } from '../components/RetentionChart';
import { PredictionSimulator } from '../components/PredictionSimulator';
import { ModelStatus } from '../components/ModelStatus';
import { ChannelTable } from '../components/ChannelTable';
import { 
  defaultParams, 
  generateROIPredictions, 
  kpiMetrics, 
  modelMetrics,
  channelComparison,
  retentionData,
} from '../data/mockData';
import type { PredictionParams } from '../types/analytics';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [params, setParams] = useState<PredictionParams>(defaultParams);
  const [channelMetric, setChannelMetric] = useState<'roas' | 'cpi' | 'breakevenDays' | 'ltv30'>('roas');
  
  // 计算ROI预测
  const roiPredictions = useMemo(() => {
    return generateROIPredictions(params);
  }, [params]);
  
  // 找到回本点
  const breakevenDay = useMemo(() => {
    const breakpoint = roiPredictions.find(d => d.breakeven);
    return breakpoint?.day || null;
  }, [roiPredictions]);
  
  const handleParamsChange = useCallback((newParams: PredictionParams) => {
    setParams(newParams);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 背景效果 */}
      <div className="grid-bg" />
      <div className="glow-effect" />
      
      {/* 头部导航 */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 主内容区 */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        
        {/* 仪表盘视图 */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI 卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SpendKPICard value={`$${kpiMetrics.totalSpend.toLocaleString()}`} change={12.5} />
              <InstallsKPICard value={kpiMetrics.totalInstalls.toLocaleString()} change={8.3} />
              <ROASKPICard value={`${kpiMetrics.overallROAS}%`} change={5.2} />
              <BreakevenKPICard value={`${breakevenDay || kpiMetrics.predictedBreakeven}天`} change={-15} />
            </div>
            
            {/* ROI预测图表 */}
            <ROIChart data={roiPredictions} breakevenDay={breakevenDay || undefined} />
            
            {/* 双列布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RetentionChart data={retentionData} />
              <ChannelChart data={channelComparison} metric={channelMetric} />
            </div>
            
            {/* 渠道详情表格 */}
            <ChannelTable data={channelComparison} />
          </div>
        )}
        
        {/* ROI预测视图 */}
        {activeTab === 'prediction' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">ROI预测模拟</h2>
                <p className="text-muted-foreground mt-1">调整参数实时预测广告投放回本周期</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 参数模拟器 */}
              <div className="lg:col-span-1">
                <PredictionSimulator 
                  params={params} 
                  onParamsChange={handleParamsChange}
                  breakevenDay={breakevenDay}
                />
              </div>
              
              {/* 预测图表 */}
              <div className="lg:col-span-2 space-y-6">
                <ROIChart data={roiPredictions} breakevenDay={breakevenDay || undefined} />
                <RetentionChart data={retentionData} />
              </div>
            </div>
          </div>
        )}
        
        {/* 渠道分析视图 */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">渠道效果分析</h2>
                <p className="text-muted-foreground mt-1">对比各广告渠道的投放效果与回本表现</p>
              </div>
              
              {/* 指标切换 */}
              <div className="flex gap-2">
                {[
                  { key: 'roas', label: 'ROAS' },
                  { key: 'cpi', label: 'CPI' },
                  { key: 'breakevenDays', label: '回本天数' },
                  { key: 'ltv30', label: 'LTV30' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setChannelMetric(item.key as any)}
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
            
            <ChannelChart data={channelComparison} metric={channelMetric} />
            <ChannelTable data={channelComparison} />
          </div>
        )}
        
        {/* 模型设置视图 */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">模型设置与状态</h2>
              <p className="text-muted-foreground mt-1">查看预测模型性能指标与配置</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ModelStatus metrics={modelMetrics} />
              
              {/* 模型架构说明 */}
              <div className="chart-container">
                <h3 className="text-lg font-semibold mb-4">预测模型架构</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-primary mb-2">数据收集层</h4>
                    <p className="text-sm text-muted-foreground">
                      实时采集广告平台API数据，包括展示量、点击量、安装量、花费等。支持Facebook、Google、TikTok、Unity等主流平台。
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-accent mb-2">特征工程层</h4>
                    <p className="text-sm text-muted-foreground">
                      提取时序特征、留存曲线特征、付费行为特征。使用滑动窗口计算LTV、ARPU等关键指标。
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-warning mb-2">预测模型层</h4>
                    <p className="text-sm text-muted-foreground">
                      采用LSTM + Transformer混合架构，结合时间序列预测与注意力机制，动态适应市场变化。
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-chart-5 mb-2">持续学习层</h4>
                    <p className="text-sm text-muted-foreground">
                      每日增量训练，对比预测与实际值计算误差，自动调整模型权重。支持A/B测试验证模型效果。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 算法说明 */}
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">核心算法说明</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">留存预测</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    使用 Survival Analysis 模型预测用户留存曲线，结合贝塔分布拟合历史数据。
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    R(t) = α × e^(-λt) + β
                  </code>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">LTV预测</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    基于留存曲线积分计算预期LTV，结合付费率和ARPPU动态调整。
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    LTV = ∫R(t) × ARPU(t) dt
                  </code>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">回本预测</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    求解累计LTV等于CPI的时间点，即为预测回本天数。
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    T_breakeven: LTV(T) = CPI
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
