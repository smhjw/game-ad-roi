import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Clock,
  type LucideIcon
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel = '较上周',
  icon: Icon,
  iconColor = 'text-primary',
  delay = 0
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <div 
      className="kpi-card animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold font-mono tracking-tight">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-danger" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl bg-muted ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

// 预定义的KPI卡片组件
export function SpendKPICard({ value, change }: { value: string; change?: number }) {
  return (
    <KPICard 
      title="总投放花费" 
      value={value} 
      change={change}
      icon={DollarSign}
      iconColor="text-warning"
      delay={0}
    />
  );
}

export function InstallsKPICard({ value, change }: { value: string; change?: number }) {
  return (
    <KPICard 
      title="总安装量" 
      value={value} 
      change={change}
      icon={Users}
      iconColor="text-accent"
      delay={100}
    />
  );
}

export function ROASKPICard({ value, change }: { value: string; change?: number }) {
  return (
    <KPICard 
      title="整体ROAS" 
      value={value} 
      change={change}
      icon={Target}
      iconColor="text-primary"
      delay={200}
    />
  );
}

export function BreakevenKPICard({ value, change }: { value: string; change?: number }) {
  return (
    <KPICard 
      title="预测回本天数" 
      value={value} 
      change={change}
      changeLabel="较预期"
      icon={Clock}
      iconColor="text-chart-3"
      delay={300}
    />
  );
}
