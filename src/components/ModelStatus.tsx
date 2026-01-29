import { Brain, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { ModelMetrics } from '../types/analytics';

interface ModelStatusProps {
  metrics: ModelMetrics;
}

export function ModelStatus({ metrics }: ModelStatusProps) {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-success';
    if (accuracy >= 80) return 'text-warning';
    return 'text-danger';
  };
  
  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 90) return { class: 'badge-success', text: '优秀' };
    if (accuracy >= 80) return { class: 'badge-warning', text: '良好' };
    return { class: 'badge-danger', text: '需优化' };
  };
  
  const badge = getAccuracyBadge(metrics.accuracy);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">模型状态</h3>
        </div>
        <span className={`badge ${badge.class}`}>
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {badge.text}
        </span>
      </div>
      
      {/* 主要指标 */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">预测准确率</p>
            <p className={`text-3xl font-mono font-bold ${getAccuracyColor(metrics.accuracy)}`}>
              {metrics.accuracy}%
            </p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(222, 35%, 18%)"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#accuracyGradient)"
                strokeWidth="6"
                strokeDasharray={`${metrics.accuracy * 1.76} 176`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(200, 100%, 50%)" />
                  <stop offset="100%" stopColor="hsl(160, 84%, 45%)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      
      {/* 详细指标 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm text-muted-foreground">MAPE (平均绝对百分比误差)</span>
          <span className="font-mono text-sm">{metrics.mape}%</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm text-muted-foreground">RMSE (均方根误差)</span>
          <span className="font-mono text-sm">{metrics.rmse}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm text-muted-foreground">R² 分数</span>
          <span className="font-mono text-sm">{metrics.r2Score}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-muted-foreground">最后更新时间</span>
          <span className="text-sm text-muted-foreground">{metrics.lastUpdated}</span>
        </div>
      </div>
      
      {/* 模型说明 */}
      <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-info shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-info mb-1">持续学习机制</p>
            <p className="text-muted-foreground">
              模型每日自动采集最新数据进行增量训练，通过对比预测值与实际值持续优化预测精度。
            </p>
          </div>
        </div>
      </div>
      
      {/* 重新训练按钮 */}
      <button className="w-full mt-4 btn-secondary flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4" />
        手动触发模型更新
      </button>
    </div>
  );
}
