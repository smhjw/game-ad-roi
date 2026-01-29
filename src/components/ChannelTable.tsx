import type { ChannelComparison } from '../types/analytics';

interface ChannelTableProps {
  data: ChannelComparison[];
}

export function ChannelTable({ data }: ChannelTableProps) {
  // 按ROAS排序
  const sortedData = [...data].sort((a, b) => b.roas - a.roas);
  
  return (
    <div className="chart-container overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">渠道详细数据</h3>
        <p className="text-sm text-muted-foreground">各渠道投放效果对比</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>渠道</th>
              <th>花费</th>
              <th>安装量</th>
              <th>CPI</th>
              <th>LTV30</th>
              <th>ROAS</th>
              <th>回本天数</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((channel, index) => (
              <tr key={channel.channelId} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <td>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="font-medium">{channel.channelName}</span>
                  </div>
                </td>
                <td className="font-mono">${channel.spend.toLocaleString()}</td>
                <td className="font-mono">{channel.installs.toLocaleString()}</td>
                <td className="font-mono">${channel.cpi.toFixed(2)}</td>
                <td className="font-mono">${channel.ltv30.toFixed(2)}</td>
                <td>
                  <span className={`font-mono font-medium ${channel.roas >= 100 ? 'text-success' : 'text-warning'}`}>
                    {channel.roas}%
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{channel.breakevenDays}天</span>
                    <div className="flex-1 max-w-[60px]">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${Math.min(100, (60 - channel.breakevenDays) / 60 * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
