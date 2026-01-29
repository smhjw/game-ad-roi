import { Link } from 'react-router-dom'
import { Sparkles, Moon, Stars, Eye } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Moon className="w-6 h-6 text-gold" />
          <span className="font-chinese text-xl font-semibold text-gradient-gold">神秘塔罗</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/spreads" className="text-muted-foreground hover:text-foreground transition-colors font-chinese">
            开始占卜
          </Link>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* 装饰性图标 */}
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 animate-pulse-slow">
            <Stars className="w-6 h-6 text-gold/60" />
          </div>
          <div className="absolute -top-2 -right-6 animate-pulse-slow" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-5 h-5 text-mystic-light/60" />
          </div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-mystic-dark via-primary to-mystic flex items-center justify-center shadow-mystic animate-float">
            <Eye className="w-16 h-16 text-gold" />
          </div>
          <div className="absolute -bottom-2 -right-4 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
            <Moon className="w-5 h-5 text-gold/60" />
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="text-5xl md:text-6xl font-chinese font-bold text-center mb-4 text-gradient-gold">
          神秘塔罗
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-chinese text-center mb-2">
          探索命运的奥秘
        </p>
        
        <p className="text-base text-muted-foreground/70 font-chinese text-center max-w-md mb-12">
          在星辰的指引下，让古老的塔罗智慧为你揭示内心的真相与未来的方向
        </p>

        {/* 开始按钮 */}
        <Link to="/spreads">
          <button className="btn-gold text-lg px-8 py-4 rounded-xl font-chinese flex items-center gap-3 group">
            <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
            开始你的占卜之旅
            <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
          </button>
        </Link>

        {/* 特性介绍 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl">
          <FeatureCard
            icon={<Moon className="w-8 h-8" />}
            title="多种牌阵"
            description="从简单的单牌到深度的凯尔特十字，满足不同需求"
          />
          <FeatureCard
            icon={<Eye className="w-8 h-8" />}
            title="深度解读"
            description="每张牌都配有详细的正逆位解释和专属建议"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="神秘体验"
            description="沉浸式的占卜体验，在神秘氛围中探索命运"
          />
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="text-center py-8 border-t border-border/30">
        <p className="text-muted-foreground/50 text-sm font-chinese">
          ✦ 让星辰指引你的道路 ✦
        </p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="tarot-card p-6 text-center group hover:shadow-glow transition-all duration-300">
      <div className="text-gold mb-4 flex justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-chinese font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-chinese">{description}</p>
    </div>
  )
}
