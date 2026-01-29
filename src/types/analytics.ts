// 广告渠道类型
export interface AdChannel {
  id: string;
  name: string;
  color: string;
  cpi: number; // Cost Per Install
  ctr: number; // Click Through Rate (%)
  cvr: number; // Conversion Rate (%)
  dailySpend: number; // 日均花费
  installs: number; // 安装量
  impressions: number; // 展示次数
}

// 用户留存数据
export interface RetentionData {
  day: number;
  rate: number;
}

// 用户LTV预测数据
export interface LTVData {
  day: number;
  ltv: number;
  cumulativeRevenue: number;
}

// ROI预测数据点
export interface ROIPrediction {
  day: number;
  revenue: number;
  cost: number;
  roi: number;
  breakeven: boolean;
}

// 预测参数
export interface PredictionParams {
  cpi: number; // 用户获取成本
  arpu: number; // 每用户平均收入
  d1Retention: number; // 次日留存率
  d7Retention: number; // 7日留存率
  d30Retention: number; // 30日留存率
  payingRate: number; // 付费率
  arppu: number; // 付费用户平均收入
  dailyBudget: number; // 日预算
  targetROAS: number; // 目标ROAS
}

// KPI指标
export interface KPIMetrics {
  totalSpend: number;
  totalInstalls: number;
  totalRevenue: number;
  averageCPI: number;
  overallROAS: number;
  predictedBreakeven: number; // 预测回本天数
  currentLTV: number;
}

// 模型性能指标
export interface ModelMetrics {
  accuracy: number;
  mape: number; // Mean Absolute Percentage Error
  rmse: number; // Root Mean Square Error
  r2Score: number;
  lastUpdated: string;
}

// 时间序列数据
export interface TimeSeriesData {
  date: string;
  value: number;
  predicted?: number;
}

// 渠道对比数据
export interface ChannelComparison {
  channelId: string;
  channelName: string;
  spend: number;
  installs: number;
  cpi: number;
  ltv30: number;
  roas: number;
  breakevenDays: number;
  color: string;
}
