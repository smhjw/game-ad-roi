import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import type { ChannelComparison } from '../types/analytics';

interface ChannelChartProps {
  data: ChannelComparison[];
  metric: 'roas' | 'cpi' | 'breakevenDays' | 'ltv30';
}

interface MetricConfig {
  label: string;
  prefix?: string;
  suffix?: string;
  better: 'higher' | 'lower';
}

const metricConfig: Record<string, MetricConfig> = {
  roas: { label: 'ROAS', suffix: '%', better: 'higher' },
  cpi: { label: 'CPI', prefix: '$', better: 'lower' },
  breakevenDays: { label: '回本天数', suffix: '天', better: 'lower' },
  ltv30: { label: 'LTV30', prefix: '$', better: 'higher' },
};

export function ChannelChart({ data, metric }: ChannelChartProps) {
  const config = metricConfig[metric];
  
  // 根据metric排序
  const sortedData = [...data].sort((a, b) => {
    if (config.better === 'higher') {
      return b[metric] - a[metric];
    }
    return a[metric] - b[metric];
  });

  const formatLabel = (value: number | string): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (config.prefix) return `${config.prefix}${numValue}`;
    if (config.suffix) return `${numValue}${config.suffix}`;
    return String(numValue);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChannelComparison }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{item.channelName}</p>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              花费: <span className="text-foreground font-mono">${item.spend.toLocaleString()}</span>
            </p>
            <p className="text-muted-foreground">
              安装量: <span className="text-foreground font-mono">{item.installs.toLocaleString()}</span>
            </p>
            <p className="text-muted-foreground">
              CPI: <span className="text-foreground font-mono">${item.cpi.toFixed(2)}</span>
            </p>
            <p className="text-muted-foreground">
              ROAS: <span className="text-success font-mono">{item.roas}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">渠道 {config.label} 对比</h3>
        <p className="text-sm text-muted-foreground">各广告渠道表现排名</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={sortedData} 
          layout="vertical"
          margin={{ top: 10, right: 60, left: 20, bottom: 10 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(222, 30%, 22%)" 
            horizontal={true}
            vertical={false}
          />
          
          <XAxis 
            type="number"
            stroke="hsl(215, 20%, 60%)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'hsl(222, 30%, 22%)' }}
          />
          
          <YAxis 
            type="category"
            dataKey="channelName"
            stroke="hsl(215, 20%, 60%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={100}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Bar 
            dataKey={metric} 
            radius={[0, 4, 4, 0]}
            maxBarSize={35}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
            ))}
            <LabelList 
              dataKey={metric} 
              position="right" 
              fill="hsl(210, 40%, 96%)"
              fontSize={12}
              formatter={formatLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
