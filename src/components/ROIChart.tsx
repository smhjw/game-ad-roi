import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import type { ROIPrediction } from '../types/analytics';

interface ROIChartProps {
  data: ROIPrediction[];
  breakevenDay?: number;
}

export function ROIChart({ data, breakevenDay }: ROIChartProps) {
  // 找到回本点
  const actualBreakeven = breakevenDay || data.find(d => d.breakeven)?.day;
  
  // 自定义Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const roiValue = payload[0]?.value;
      const isBreakeven = roiValue >= 100;
      
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-1">第 {label} 天</p>
          <p className={`text-lg font-mono font-semibold ${isBreakeven ? 'text-success' : 'text-warning'}`}>
            ROI: {roiValue?.toFixed(1)}%
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            累计收入: ${payload[0]?.payload?.revenue?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">ROI预测曲线</h3>
          <p className="text-sm text-muted-foreground">基于当前参数的180天ROI预测</p>
        </div>
        {actualBreakeven && (
          <div className="badge badge-success">
            预计 {actualBreakeven} 天回本
          </div>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(200, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(160, 84%, 45%)" />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(222, 30%, 22%)" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="day" 
            stroke="hsl(215, 20%, 60%)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'hsl(222, 30%, 22%)' }}
            tickFormatter={(value) => `D${value}`}
          />
          
          <YAxis 
            stroke="hsl(215, 20%, 60%)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'hsl(222, 30%, 22%)' }}
            tickFormatter={(value) => `${value}%`}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* 100% 回本线 */}
          <ReferenceLine 
            y={100} 
            stroke="hsl(160, 84%, 45%)" 
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{ 
              value: '回本线', 
              position: 'right',
              fill: 'hsl(160, 84%, 45%)',
              fontSize: 12
            }}
          />
          
          {/* 回本点标记 */}
          {actualBreakeven && (
            <ReferenceLine 
              x={actualBreakeven} 
              stroke="hsl(160, 84%, 45%)" 
              strokeDasharray="3 3"
            />
          )}
          
          <Area
            type="monotone"
            dataKey="roi"
            stroke="none"
            fill="url(#roiGradient)"
          />
          
          <Line
            type="monotone"
            dataKey="roi"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ 
              r: 6, 
              stroke: 'hsl(200, 100%, 50%)', 
              strokeWidth: 2,
              fill: 'hsl(222, 47%, 8%)'
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
