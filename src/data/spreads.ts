import { Spread } from '../types/tarot'

export const spreads: Spread[] = [
  {
    id: 'single',
    name: '单牌占卜',
    description: '最简单直接的占卜方式，抽取一张牌获得当下最需要的指引。适合日常冥想或快速获取答案。',
    cardCount: 1,
    icon: '🌟',
    positions: [
      {
        id: 1,
        name: '核心信息',
        description: '这张牌代表你当前最需要关注的核心信息和指引',
        x: 50,
        y: 50
      }
    ]
  },
  {
    id: 'three-card',
    name: '三牌阵',
    description: '经典的时间线牌阵，展示过去的影响、现在的状态和未来的发展。也可用于探索身心灵的和谐。',
    cardCount: 3,
    icon: '🔮',
    positions: [
      {
        id: 1,
        name: '过去',
        description: '过去的影响和已经发生的事情，塑造了当前局面的基础',
        x: 20,
        y: 50
      },
      {
        id: 2,
        name: '现在',
        description: '当前的状态和正在经历的能量，你现在所处的位置',
        x: 50,
        y: 50
      },
      {
        id: 3,
        name: '未来',
        description: '如果继续当前的道路，可能的发展方向和结果',
        x: 80,
        y: 50
      }
    ]
  },
  {
    id: 'love',
    name: '爱情牌阵',
    description: '专门用于探索感情关系的牌阵，揭示双方的状态、关系的核心和发展方向。',
    cardCount: 5,
    icon: '💜',
    positions: [
      {
        id: 1,
        name: '你的状态',
        description: '你在这段关系中的内心状态和能量',
        x: 25,
        y: 30
      },
      {
        id: 2,
        name: '对方的状态',
        description: '对方在这段关系中的内心状态和能量',
        x: 75,
        y: 30
      },
      {
        id: 3,
        name: '关系的核心',
        description: '你们关系的本质和当前最重要的议题',
        x: 50,
        y: 50
      },
      {
        id: 4,
        name: '挑战与阻碍',
        description: '你们需要面对和克服的挑战',
        x: 25,
        y: 70
      },
      {
        id: 5,
        name: '发展方向',
        description: '这段关系可能的发展方向和建议',
        x: 75,
        y: 70
      }
    ]
  },
  {
    id: 'celtic-cross',
    name: '凯尔特十字',
    description: '最经典、最全面的塔罗牌阵之一。提供深入的分析，涵盖问题的各个层面，适合复杂问题的深度解读。',
    cardCount: 10,
    icon: '✨',
    positions: [
      {
        id: 1,
        name: '当前状态',
        description: '你当前所处的核心状况',
        x: 30,
        y: 50
      },
      {
        id: 2,
        name: '挑战/障碍',
        description: '横跨你道路的挑战或需要面对的问题',
        x: 30,
        y: 50
      },
      {
        id: 3,
        name: '意识层面',
        description: '你意识到的目标和愿望',
        x: 30,
        y: 20
      },
      {
        id: 4,
        name: '潜意识',
        description: '影响你的潜在力量和隐藏因素',
        x: 30,
        y: 80
      },
      {
        id: 5,
        name: '过去',
        description: '近期影响现状的过去事件',
        x: 10,
        y: 50
      },
      {
        id: 6,
        name: '近期未来',
        description: '即将到来的影响和短期发展',
        x: 50,
        y: 50
      },
      {
        id: 7,
        name: '你的态度',
        description: '你对问题的态度和立场',
        x: 75,
        y: 85
      },
      {
        id: 8,
        name: '外部影响',
        description: '环境和他人对你的影响',
        x: 75,
        y: 60
      },
      {
        id: 9,
        name: '希望与恐惧',
        description: '你内心的期望和担忧',
        x: 75,
        y: 35
      },
      {
        id: 10,
        name: '最终结果',
        description: '当前道路可能导向的最终结局',
        x: 75,
        y: 10
      }
    ]
  }
]
