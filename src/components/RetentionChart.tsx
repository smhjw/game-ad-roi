import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import type { RetentionData } from '../types/analytics';

interface RetentionChartProps {
  data: RetentionData[];
}

export function RetentionChart({ data }: RetentionChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">第 {label} 天</p>
          <p className="text-lg font-mono font-semibold text-accent">
            留存率: {payload[0]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">用户留存曲线</h3>
        <p className="text-sm text-muted-foreground">追踪用户在不同时间点的留存情况</p>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0}/>
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
            domain={[0, 50]}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="rate"
            stroke="hsl(160, 84%, 45%)"
            strokeWidth={3}
            fill="url(#retentionGradient)"
            dot={{ 
              fill: 'hsl(222, 47%, 8%)', 
              stroke: 'hsl(160, 84%, 45%)', 
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{ 
              r: 6, 
              stroke: 'hsl(160, 84%, 45%)', 
              strokeWidth: 2,
              fill: 'hsl(222, 47%, 8%)'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* 关键留存指标 */}
      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
        {[
          { day: 1, label: 'D1留存' },
          { day: 7, label: 'D7留存' },
          { day: 30, label: 'D30留存' },
          { day: 90, label: 'D90留存' },
        ].map(({ day, label }) => {
          const item = data.find(d => d.day === day);
          return (
            <div key={day} className="text-center">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-mono font-semibold text-accent">
                {item?.rate || '-'}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
