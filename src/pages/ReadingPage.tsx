import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react'
import { Spread, DrawnCard } from '../types/tarot'
import { drawRandomCards } from '../data/tarotCards'
import TarotCardComponent from '../components/TarotCard'
import ReadingResult from '../components/ReadingResult'

interface Props {
  spread: Spread | null
}

type ReadingPhase = 'intro' | 'drawing' | 'revealing' | 'complete'

export default function ReadingPage({ spread }: Props) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<ReadingPhase>('intro')
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [revealedCount, setRevealedCount] = useState(0)
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!spread) {
      navigate('/spreads')
    }
  }, [spread, navigate])

  if (!spread) {
    return null
  }

  const handleStartDrawing = () => {
    const cards = drawRandomCards(spread.cardCount)
    const drawn: DrawnCard[] = cards.map((c, index) => ({
      card: c.card,
      position: spread.positions[index],
      isReversed: c.isReversed
    }))
    setDrawnCards(drawn)
    setPhase('drawing')
  }

  const handleRevealCard = () => {
    if (revealedCount < spread.cardCount) {
      setRevealedCount(prev => prev + 1)
      if (revealedCount + 1 >= spread.cardCount) {
        setTimeout(() => setPhase('complete'), 800)
      }
    }
  }

  const handleReset = () => {
    setPhase('intro')
    setDrawnCards([])
    setRevealedCount(0)
    setSelectedCardIndex(null)
  }

  const handleCardClick = (index: number) => {
    if (phase === 'complete') {
      setSelectedCardIndex(selectedCardIndex === index ? null : index)
    }
  }

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-border/30">
        <Link to="/spreads" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-chinese">选择其他牌阵</span>
        </Link>
        {phase !== 'intro' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-chinese">重新占卜</span>
          </button>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 牌阵名称 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-chinese font-bold text-gradient-gold mb-2">
            {spread.icon} {spread.name}
          </h1>
          <p className="text-muted-foreground font-chinese text-sm">
            {spread.description}
          </p>
        </div>

        {/* 占卜阶段内容 */}
        {phase === 'intro' && (
          <IntroPhase spread={spread} onStart={handleStartDrawing} />
        )}

        {(phase === 'drawing' || phase === 'complete') && (
          <div className="space-y-8">
            {/* 牌阵展示区 */}
            <SpreadDisplay
              spread={spread}
              drawnCards={drawnCards}
              revealedCount={revealedCount}
              selectedCardIndex={selectedCardIndex}
              onCardClick={handleCardClick}
            />

            {/* 翻牌按钮 */}
            {phase === 'drawing' && revealedCount < spread.cardCount && (
              <div className="text-center">
                <button
                  onClick={handleRevealCard}
                  className="btn-gold px-8 py-4 text-lg font-chinese flex items-center gap-3 mx-auto group"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
                  揭示第 {revealedCount + 1} 张牌
                  <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
                </button>
                <p className="text-muted-foreground/60 text-sm mt-3 font-chinese">
                  {spread.positions[revealedCount]?.name} - {spread.positions[revealedCount]?.description}
                </p>
              </div>
            )}

            {/* 占卜结果 */}
            {phase === 'complete' && (
              <ReadingResult
                drawnCards={drawnCards}
                spread={spread}
                selectedCardIndex={selectedCardIndex}
                onSelectCard={setSelectedCardIndex}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function IntroPhase({ spread, onStart }: { spread: Spread; onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* 装饰性卡牌背面 */}
      <div className="flex justify-center gap-4 mb-12">
        {Array.from({ length: Math.min(3, spread.cardCount) }).map((_, i) => (
          <div
            key={i}
            className="w-24 h-36 tarot-card flex items-center justify-center animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="text-gold/50 text-4xl">✦</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-chinese font-semibold text-foreground mb-4">
        准备开始占卜
      </h2>
      
      <p className="text-muted-foreground font-chinese mb-8 leading-relaxed">
        在开始之前，请闭上眼睛，深呼吸几次，让心灵平静下来。<br />
        在心中默念你想要探索的问题或意图。<br />
        当你准备好时，点击下方按钮开始你的塔罗之旅。
      </p>

      {/* 牌位说明 */}
      <div className="tarot-card p-6 mb-8 text-left">
        <h3 className="text-lg font-chinese font-semibold text-gold mb-4">牌位说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {spread.positions.map((pos) => (
            <div key={pos.id} className="flex gap-2">
              <span className="text-gold font-semibold">{pos.id}.</span>
              <div>
                <span className="text-foreground font-chinese">{pos.name}</span>
                <span className="text-muted-foreground/70 text-sm font-chinese ml-2">
                  - {pos.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="btn-gold px-10 py-4 text-lg font-chinese flex items-center gap-3 mx-auto group"
      >
        <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
        我已准备好，开始抽牌
        <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
      </button>
    </div>
  )
}

function SpreadDisplay({
  spread,
  drawnCards,
  revealedCount,
  selectedCardIndex,
  onCardClick
}: {
  spread: Spread
  drawnCards: DrawnCard[]
  revealedCount: number
  selectedCardIndex: number | null
  onCardClick: (index: number) => void
}) {
  // 根据牌阵类型决定布局
  const getLayoutClass = () => {
    switch (spread.id) {
      case 'single':
        return 'flex justify-center'
      case 'three-card':
        return 'flex justify-center gap-4 md:gap-8 flex-wrap'
      case 'love':
        return 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto'
      case 'celtic-cross':
        return 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto'
      default:
        return 'flex flex-wrap justify-center gap-4'
    }
  }

  return (
    <div className={getLayoutClass()}>
      {drawnCards.map((drawn, index) => (
        <div
          key={index}
          className={`
            transition-all duration-500
            ${index < revealedCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            ${selectedCardIndex === index ? 'ring-2 ring-gold rounded-xl' : ''}
          `}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <TarotCardComponent
            card={drawn.card}
            isReversed={drawn.isReversed}
            isRevealed={index < revealedCount}
            position={drawn.position}
            onClick={() => onCardClick(index)}
          />
        </div>
      ))}
    </div>
  )
}
