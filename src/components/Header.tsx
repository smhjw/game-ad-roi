import { 
  LayoutDashboard, 
  LineChart as LineChartIcon, 
  Layers, 
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const tabs = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'prediction', label: 'ROI预测', icon: LineChartIcon },
    { id: 'channels', label: '渠道分析', icon: Layers },
    { id: 'settings', label: '模型设置', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <LineChartIcon className="w-5 h-5 text-background" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">ROI Predictor</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">游戏广告回本预测</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`tab-button flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors hidden sm:block">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-border animate-fade-in">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
