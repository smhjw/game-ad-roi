import { DrawnCard, Spread } from '../types/tarot'
import { Sparkles, ChevronRight } from 'lucide-react'

interface Props {
  drawnCards: DrawnCard[]
  spread: Spread
  selectedCardIndex: number | null
  onSelectCard: (index: number | null) => void
}

export default function ReadingResult({ drawnCards, spread, selectedCardIndex, onSelectCard }: Props) {
  const selectedCard = selectedCardIndex !== null ? drawnCards[selectedCardIndex] : null

  return (
    <div className="mt-8 space-y-8">
      {/* 总体解读标题 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-gold mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-xl font-chinese font-semibold">占卜解读</span>
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="text-muted-foreground text-sm font-chinese">
          点击上方的牌查看详细解读，或浏览下方的完整分析
        </p>
      </div>

      {/* 选中卡片的详细解读 */}
      {selectedCard && (
        <div className="tarot-card p-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-24 tarot-card flex items-center justify-center text-2xl">
              {getCardEmoji(selectedCard.card.number, selectedCard.card.arcana)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-chinese font-bold text-gold">
                  {selectedCard.card.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full font-chinese ${
                  selectedCard.isReversed 
                    ? 'bg-mystic/30 text-mystic-light' 
                    : 'bg-gold/20 text-gold'
                }`}>
                  {selectedCard.isReversed ? '逆位' : '正位'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1 font-chinese">
                位置：{selectedCard.position.name} - {selectedCard.position.description}
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="text-sm font-chinese font-semibold text-foreground mb-1">
                    {selectedCard.isReversed ? '逆位含义' : '正位含义'}
                  </h4>
                  <p className="text-sm text-muted-foreground font-chinese leading-relaxed">
                    {selectedCard.isReversed 
                      ? selectedCard.card.reversedMeaning 
                      : selectedCard.card.uprightMeaning}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-chinese font-semibold text-foreground mb-1">建议</h4>
                  <p className="text-sm text-muted-foreground font-chinese leading-relaxed">
                    {selectedCard.card.advice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 所有牌的快速导航 */}
      <div className="tarot-card p-6">
        <h3 className="text-lg font-chinese font-semibold text-gold mb-4">完整牌阵解读</h3>
        <div className="space-y-4">
          {drawnCards.map((drawn, index) => (
            <button
              key={index}
              onClick={() => onSelectCard(selectedCardIndex === index ? null : index)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                selectedCardIndex === index 
                  ? 'bg-gold/10 border border-gold/30' 
                  : 'bg-mystic-dark/30 hover:bg-mystic-dark/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-chinese font-semibold text-foreground">
                      {drawn.card.name}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      drawn.isReversed 
                        ? 'bg-mystic/30 text-mystic-light' 
                        : 'bg-gold/20 text-gold'
                    }`}>
                      {drawn.isReversed ? '逆' : '正'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-chinese">
                    {drawn.position.name}：{drawn.position.description}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 text-gold/50 transition-transform ${
                  selectedCardIndex === index ? 'rotate-90' : ''
                }`} />
              </div>
              
              {/* 展开的详细内容 */}
              {selectedCardIndex === index && (
                <div className="mt-4 pt-4 border-t border-border/30 animate-fade-in">
                  <p className="text-sm text-muted-foreground font-chinese leading-relaxed">
                    {drawn.isReversed ? drawn.card.reversedMeaning : drawn.card.uprightMeaning}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {drawn.card.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-mystic-dark/50 text-gold/80 font-chinese"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 综合建议 */}
      <div className="tarot-card p-6">
        <h3 className="text-lg font-chinese font-semibold text-gold mb-4">✨ 综合解读与建议</h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground font-chinese leading-relaxed mb-4">
            在这次 <span className="text-gold">{spread.name}</span> 占卜中，你抽到了 {drawnCards.length} 张牌，
            其中有 {drawnCards.filter(d => !d.isReversed).length} 张正位牌和 {drawnCards.filter(d => d.isReversed).length} 张逆位牌。
          </p>
          
          {/* 根据牌面生成建议 */}
          <div className="space-y-3">
            {drawnCards.some(d => d.card.arcana === 'major') && (
              <p className="text-muted-foreground font-chinese leading-relaxed">
                🌟 你的牌阵中出现了大阿卡纳牌（
                {drawnCards.filter(d => d.card.arcana === 'major').map(d => d.card.name).join('、')}
                ），这暗示着你正面临人生中的重要主题和转折点，值得深入思考。
              </p>
            )}
            
            <p className="text-muted-foreground font-chinese leading-relaxed">
              💫 记住，塔罗牌是一面镜子，反映的是你内心的智慧和直觉。
              最终的决定权永远在你自己手中。相信自己的内在力量，勇敢地走向你的未来。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCardEmoji(number: number, arcana: string): string {
  if (arcana === 'major') {
    const emojis: Record<number, string> = {
      0: '🃏', 1: '🎭', 2: '🌙', 3: '👑', 4: '🏛️',
      5: '📿', 6: '💕', 7: '🎪', 8: '🦁', 9: '🏮',
      10: '🎡', 11: '⚖️', 12: '🔮', 13: '💀', 14: '🏺',
      15: '😈', 16: '🗼', 17: '⭐', 18: '🌕', 19: '☀️',
      20: '📯', 21: '🌍'
    }
    return emojis[number] || '✦'
  }
  return '✦'
}
