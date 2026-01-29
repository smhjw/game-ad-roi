import { useState } from 'react'
import { TarotCard, SpreadPosition } from '../types/tarot'
import { cn } from '../lib/utils'

interface Props {
  card: TarotCard
  isReversed: boolean
  isRevealed: boolean
  position?: SpreadPosition
  onClick?: () => void
}

export default function TarotCardComponent({ card, isReversed, isRevealed, position, onClick }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)

  // 当卡片被揭示时触发翻转动画
  if (isRevealed && !isFlipped) {
    setTimeout(() => setIsFlipped(true), 100)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* 位置名称 */}
      {position && (
        <div className="text-center mb-1">
          <span className="text-xs text-gold/80 font-chinese">{position.name}</span>
        </div>
      )}
      
      {/* 卡片容器 */}
      <div
        className={cn(
          "card-flip-container cursor-pointer",
          "w-32 h-48 md:w-40 md:h-60"
        )}
        onClick={onClick}
      >
        <div className={cn("card-flip w-full h-full", isFlipped && "flipped")}>
          {/* 卡片背面 */}
          <div className="card-front w-full h-full">
            <div className="w-full h-full tarot-card flex items-center justify-center bg-gradient-to-br from-mystic-dark via-primary/80 to-mystic-dark">
              <div className="relative">
                {/* 中央图案 */}
                <div className="text-5xl text-gold/60 animate-pulse-slow">✦</div>
                {/* 角落装饰 */}
                <div className="absolute -top-6 -left-6 text-gold/30 text-sm">☽</div>
                <div className="absolute -top-6 -right-6 text-gold/30 text-sm">☾</div>
                <div className="absolute -bottom-6 -left-6 text-gold/30 text-sm">✧</div>
                <div className="absolute -bottom-6 -right-6 text-gold/30 text-sm">✧</div>
              </div>
            </div>
          </div>

          {/* 卡片正面 */}
          <div className="card-back w-full h-full">
            <div
              className={cn(
                "w-full h-full tarot-card p-3 flex flex-col",
                "bg-gradient-to-b from-card via-mystic-dark/90 to-card",
                isReversed && "rotate-180"
              )}
            >
              {/* 卡片顶部 - 名称 */}
              <div className="text-center border-b border-gold/30 pb-2 mb-2">
                <h3 className="text-sm md:text-base font-chinese font-semibold text-gold truncate">
                  {card.name}
                </h3>
                <p className="text-xs text-muted-foreground/70">{card.nameEn}</p>
              </div>

              {/* 卡片中央 - 符号/图标区域 */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl mb-2">
                    {getCardSymbol(card)}
                  </div>
                  <div className="text-xs text-gold/60">
                    {card.arcana === 'major' ? '大阿卡纳' : `${getSuitName(card.suit)} · ${card.number}`}
                  </div>
                </div>
              </div>

              {/* 卡片底部 - 关键词 */}
              <div className="border-t border-gold/30 pt-2 mt-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {card.keywords.slice(0, 2).map((keyword, i) => (
                    <span
                      key={i}
                      className="text-xs px-1.5 py-0.5 rounded bg-gold/10 text-gold/80 font-chinese"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* 逆位标记 */}
              {isReversed && (
                <div className="absolute top-1 right-1 rotate-180">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-mystic/50 text-foreground/80 font-chinese">
                    逆位
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 正逆位状态 */}
      {isFlipped && (
        <div className={cn(
          "text-xs font-chinese px-2 py-1 rounded-full",
          isReversed 
            ? "bg-mystic/30 text-mystic-light" 
            : "bg-gold/20 text-gold"
        )}>
          {isReversed ? '逆位' : '正位'}
        </div>
      )}
    </div>
  )
}

// 根据牌获取符号
function getCardSymbol(card: TarotCard): string {
  // 大阿卡纳符号
  const majorSymbols: Record<number, string> = {
    0: '🃏',
    1: '🎭',
    2: '🌙',
    3: '👑',
    4: '🏛️',
    5: '📿',
    6: '💕',
    7: '🎪',
    8: '🦁',
    9: '🏮',
    10: '🎡',
    11: '⚖️',
    12: '🔮',
    13: '💀',
    14: '🏺',
    15: '😈',
    16: '🗼',
    17: '⭐',
    18: '🌕',
    19: '☀️',
    20: '📯',
    21: '🌍'
  }

  if (card.arcana === 'major') {
    return majorSymbols[card.number] || '✦'
  }

  // 小阿卡纳符号
  const suitSymbols: Record<string, string> = {
    wands: '🔥',
    cups: '🏆',
    swords: '⚔️',
    pentacles: '💰'
  }

  return suitSymbols[card.suit || ''] || '✦'
}

// 获取牌组名称
function getSuitName(suit?: string): string {
  const names: Record<string, string> = {
    wands: '权杖',
    cups: '圣杯',
    swords: '宝剑',
    pentacles: '星币'
  }
  return names[suit || ''] || ''
}
