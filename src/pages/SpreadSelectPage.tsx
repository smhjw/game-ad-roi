import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { spreads } from '../data/spreads'
import { Spread } from '../types/tarot'

interface Props {
  onSelectSpread: (spread: Spread) => void
}

export default function SpreadSelectPage({ onSelectSpread }: Props) {
  const navigate = useNavigate()

  const handleSelectSpread = (spread: Spread) => {
    onSelectSpread(spread)
    navigate('/reading')
  }

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-border/30">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-chinese">返回首页</span>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-chinese font-bold text-gradient-gold mb-4">
            选择牌阵
          </h1>
          <p className="text-muted-foreground font-chinese max-w-lg mx-auto">
            不同的牌阵适合不同的问题，选择最符合你当前需求的牌阵开始占卜
          </p>
        </div>

        {/* 牌阵列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spreads.map((spread) => (
            <SpreadCard
              key={spread.id}
              spread={spread}
              onSelect={() => handleSelectSpread(spread)}
            />
          ))}
        </div>

        {/* 提示 */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground/60 text-sm font-chinese flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-gold/50" />
            在占卜前，请先静心冥想你想要探索的问题
            <Sparkles className="w-4 h-4 text-gold/50" />
          </p>
        </div>
      </div>
    </div>
  )
}

function SpreadCard({ spread, onSelect }: { spread: Spread; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="tarot-card p-6 text-left w-full group hover:shadow-glow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{spread.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-chinese font-semibold text-foreground group-hover:text-gold transition-colors">
              {spread.name}
            </h3>
            <span className="text-sm text-gold/80 font-chinese">
              {spread.cardCount} 张牌
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-chinese leading-relaxed">
            {spread.description}
          </p>
          
          {/* 牌位预览 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {spread.positions.slice(0, 4).map((pos) => (
              <span
                key={pos.id}
                className="text-xs px-2 py-1 rounded-full bg-mystic-dark/50 text-muted-foreground font-chinese"
              >
                {pos.name}
              </span>
            ))}
            {spread.positions.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-mystic-dark/50 text-muted-foreground/60 font-chinese">
                +{spread.positions.length - 4} 更多
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
