import type { 
  AdChannel, 
  RetentionData, 
  ROIPrediction, 
  PredictionParams,
  KPIMetrics,
  ModelMetrics,
  ChannelComparison,
  TimeSeriesData
} from '../types/analytics';

// 广告渠道数据
export const adChannels: AdChannel[] = [
  {
    id: 'facebook',
    name: 'Facebook Ads',
    color: '#00b4d8',
    cpi: 2.50,
    ctr: 1.8,
    cvr: 15.5,
    dailySpend: 5000,
    installs: 2000,
    impressions: 280000,
  },
  {
    id: 'google',
    name: 'Google UAC',
    color: '#00f5a0',
    cpi: 1.80,
    ctr: 2.2,
    cvr: 18.3,
    dailySpend: 8000,
    installs: 4444,
    impressions: 200000,
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    color: '#a855f7',
    cpi: 1.20,
    ctr: 3.5,
    cvr: 12.8,
    dailySpend: 3000,
    installs: 2500,
    impressions: 85000,
  },
  {
    id: 'unity',
    name: 'Unity Ads',
    color: '#f59e0b',
    cpi: 0.85,
    ctr: 4.2,
    cvr: 22.1,
    dailySpend: 2000,
    installs: 2353,
    impressions: 47000,
  },
  {
    id: 'applovin',
    name: 'AppLovin',
    color: '#ec4899',
    cpi: 1.50,
    ctr: 2.8,
    cvr: 16.5,
    dailySpend: 4000,
    installs: 2667,
    impressions: 95000,
  },
];

// 用户留存曲线
export const retentionData: RetentionData[] = [
  { day: 1, rate: 42 },
  { day: 2, rate: 28 },
  { day: 3, rate: 22 },
  { day: 7, rate: 15 },
  { day: 14, rate: 10 },
  { day: 30, rate: 6.5 },
  { day: 60, rate: 4.2 },
  { day: 90, rate: 3.1 },
];

// 默认预测参数
export const defaultParams: PredictionParams = {
  cpi: 1.80,
  arpu: 0.15,
  d1Retention: 42,
  d7Retention: 15,
  d30Retention: 6.5,
  payingRate: 3.5,
  arppu: 25,
  dailyBudget: 10000,
  targetROAS: 120,
};

// 平台分成比例（30%）
const PLATFORM_FEE_RATE = 0.30;

// 生成ROI预测数据
export function generateROIPredictions(params: PredictionParams): ROIPrediction[] {
  const predictions: ROIPrediction[] = [];
  let cumulativeRevenue = 0;
  const dailyCost = params.dailyBudget;
  const usersPerDay = params.dailyBudget / params.cpi;
  
  for (let day = 1; day <= 180; day++) {
    // 使用留存率曲线计算活跃用户
    let retentionRate: number;
    if (day === 1) retentionRate = params.d1Retention / 100;
    else if (day <= 7) retentionRate = params.d1Retention / 100 * Math.pow(0.85, day - 1);
    else if (day <= 30) retentionRate = params.d7Retention / 100 * Math.pow(0.92, day - 7);
    else retentionRate = params.d30Retention / 100 * Math.pow(0.97, day - 30);
    
    // 计算日收入（扣除平台30%分成后的实际收入）
    const activeUsers = usersPerDay * retentionRate;
    const grossRevenue = activeUsers * params.arpu;
    const dailyRevenue = grossRevenue * (1 - PLATFORM_FEE_RATE); // 实际到手70%
    cumulativeRevenue += dailyRevenue;
    
    // 累计成本（简化模型：假设只投放第一天）
    const totalCost = dailyCost;
    
    const roi = totalCost > 0 ? (cumulativeRevenue / totalCost) * 100 : 0;
    
    predictions.push({
      day,
      revenue: Math.round(cumulativeRevenue * 100) / 100,
      cost: totalCost,
      roi: Math.round(roi * 10) / 10,
      breakeven: roi >= 100,
    });
  }
  
  return predictions;
}

// KPI指标
export const kpiMetrics: KPIMetrics = {
  totalSpend: 22000,
  totalInstalls: 13964,
  totalRevenue: 28500,
  averageCPI: 1.58,
  overallROAS: 129.5,
  predictedBreakeven: 45,
  currentLTV: 4.25,
};

// 模型性能指标
export const modelMetrics: ModelMetrics = {
  accuracy: 94.2,
  mape: 8.5,
  rmse: 0.23,
  r2Score: 0.91,
  lastUpdated: '2026-01-29 14:30',
};

// 渠道对比数据
export const channelComparison: ChannelComparison[] = [
  {
    channelId: 'facebook',
    channelName: 'Facebook Ads',
    spend: 150000,
    installs: 60000,
    cpi: 2.50,
    ltv30: 3.80,
    roas: 152,
    breakevenDays: 38,
    color: '#00b4d8',
  },
  {
    channelId: 'google',
    channelName: 'Google UAC',
    spend: 240000,
    installs: 133333,
    cpi: 1.80,
    ltv30: 4.20,
    roas: 233,
    breakevenDays: 28,
    color: '#00f5a0',
  },
  {
    channelId: 'tiktok',
    channelName: 'TikTok Ads',
    spend: 90000,
    installs: 75000,
    cpi: 1.20,
    ltv30: 2.85,
    roas: 238,
    breakevenDays: 32,
    color: '#a855f7',
  },
  {
    channelId: 'unity',
    channelName: 'Unity Ads',
    spend: 60000,
    installs: 70588,
    cpi: 0.85,
    ltv30: 2.10,
    roas: 247,
    breakevenDays: 25,
    color: '#f59e0b',
  },
  {
    channelId: 'applovin',
    channelName: 'AppLovin',
    spend: 120000,
    installs: 80000,
    cpi: 1.50,
    ltv30: 3.45,
    roas: 230,
    breakevenDays: 30,
    color: '#ec4899',
  },
];

// 历史趋势数据
export function generateTrendData(days: number = 30): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const baseValue = 100;
  let currentValue = baseValue;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // 添加随机波动
    const change = (Math.random() - 0.45) * 10;
    currentValue = Math.max(50, Math.min(200, currentValue + change));
    
    // 预测值（最近7天）
    const predicted = i <= 7 ? currentValue * (1 + (Math.random() - 0.5) * 0.1) : undefined;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(currentValue * 100) / 100,
      predicted: predicted ? Math.round(predicted * 100) / 100 : undefined,
    });
  }
  
  return data;
}

// 留存热力图数据
export function generateRetentionHeatmap(): number[][] {
  const cohorts = 8;
  const days = 30;
  const data: number[][] = [];
  
  for (let cohort = 0; cohort < cohorts; cohort++) {
    const row: number[] = [];
    let retention = 100;
    
    for (let day = 0; day < days; day++) {
      if (day === 0) {
        row.push(100);
      } else {
        // 模拟留存衰减
        const decayRate = 0.85 + Math.random() * 0.1;
        retention = Math.max(1, retention * (day <= 7 ? decayRate : 0.95 + Math.random() * 0.03));
        row.push(Math.round(retention * 10) / 10);
      }
    }
    data.push(row);
  }
  
  return data;
}
