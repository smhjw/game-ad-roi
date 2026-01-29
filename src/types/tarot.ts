// 塔罗牌数据类型
export interface TarotCard {
  id: number
  name: string
  nameEn: string
  arcana: 'major' | 'minor'
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  number: number
  keywords: string[]
  uprightMeaning: string
  reversedMeaning: string
  description: string
  advice: string
  element?: string
  zodiac?: string
}

// 牌阵类型
export interface Spread {
  id: string
  name: string
  description: string
  cardCount: number
  positions: SpreadPosition[]
  icon: string
}

export interface SpreadPosition {
  id: number
  name: string
  description: string
  x: number
  y: number
}

// 占卜结果
export interface ReadingResult {
  spread: Spread
  cards: DrawnCard[]
  timestamp: Date
  question?: string
}

export interface DrawnCard {
  card: TarotCard
  position: SpreadPosition
  isReversed: boolean
}
