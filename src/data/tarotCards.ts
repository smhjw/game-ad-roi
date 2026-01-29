import { TarotCard } from '../types/tarot'

// 大阿卡纳牌 (22张)
export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: '愚者',
    nameEn: 'The Fool',
    arcana: 'major',
    number: 0,
    keywords: ['新开始', '纯真', '冒险', '自由'],
    uprightMeaning: '代表新的开始、无限可能和纯真的心态。愚者象征着勇于冒险、不被世俗束缚的精神。这张牌鼓励你相信直觉，勇敢踏上未知的旅程。',
    reversedMeaning: '可能暗示鲁莽、不负责任或对风险视而不见。逆位的愚者提醒你需要更加谨慎，在追求自由的同时也要考虑后果。',
    description: '愚者站在悬崖边，仰望天空，一只小狗在他脚边。他背着简单的行囊，手持白玫瑰，象征纯洁与热情。',
    advice: '相信自己的直觉，勇敢迈出第一步。新的冒险正在等待你。',
    element: '风',
    zodiac: '天王星'
  },
  {
    id: 1,
    name: '魔术师',
    nameEn: 'The Magician',
    arcana: 'major',
    number: 1,
    keywords: ['创造力', '技能', '意志力', '资源'],
    uprightMeaning: '代表你拥有实现目标所需的所有工具和才能。魔术师象征着创造力、意志力和行动力，提醒你充分利用手中的资源。',
    reversedMeaning: '可能暗示操纵、欺骗或才能被浪费。逆位时提醒你要诚实面对自己，不要滥用能力。',
    description: '魔术师站在祭坛前，一手指天，一手指地，象征连接天地的力量。桌上摆放着代表四元素的工具。',
    advice: '你已具备成功的条件，是时候将想法付诸行动了。',
    element: '风',
    zodiac: '水星'
  },
  {
    id: 2,
    name: '女祭司',
    nameEn: 'The High Priestess',
    arcana: 'major',
    number: 2,
    keywords: ['直觉', '潜意识', '神秘', '智慧'],
    uprightMeaning: '代表直觉、内在智慧和潜意识的力量。女祭司提醒你倾听内心的声音，相信那些无法用逻辑解释的感受。',
    reversedMeaning: '可能暗示忽视直觉、秘密或情绪压抑。逆位时需要更加关注内心世界。',
    description: '女祭司坐在两根柱子之间，手持卷轴，象征隐藏的知识。她的蓝色长袍代表神秘与智慧。',
    advice: '静下心来倾听内在的声音，答案就在你心中。',
    element: '水',
    zodiac: '月亮'
  },
  {
    id: 3,
    name: '皇后',
    nameEn: 'The Empress',
    arcana: 'major',
    number: 3,
    keywords: ['丰饶', '母性', '美丽', '自然'],
    uprightMeaning: '代表丰饶、创造力和母性能量。皇后象征着爱、美丽和生命的滋养，预示着创造性成果和幸福。',
    reversedMeaning: '可能暗示过度依赖、创意阻塞或忽视自我关怀。逆位时需要平衡给予和接受。',
    description: '皇后坐在奢华的宝座上，周围是茂盛的花园和流水，象征大自然的丰饶与美丽。',
    advice: '拥抱你的创造力，让爱与美在生活中流动。',
    element: '土',
    zodiac: '金星'
  },
  {
    id: 4,
    name: '皇帝',
    nameEn: 'The Emperor',
    arcana: 'major',
    number: 4,
    keywords: ['权威', '结构', '稳定', '领导'],
    uprightMeaning: '代表权威、秩序和稳定的力量。皇帝象征着领导力、责任感和保护，提醒你建立稳固的基础。',
    reversedMeaning: '可能暗示专制、僵化或控制欲过强。逆位时需要检视权力的使用方式。',
    description: '皇帝坐在石头宝座上，手持权杖和宝球，象征权力与统治。他的盔甲代表保护与坚定。',
    advice: '建立秩序和结构，以坚定的领导力前进。',
    element: '火',
    zodiac: '白羊座'
  },
  {
    id: 5,
    name: '教皇',
    nameEn: 'The Hierophant',
    arcana: 'major',
    number: 5,
    keywords: ['传统', '信仰', '教导', '精神指引'],
    uprightMeaning: '代表传统、精神指引和教育。教皇象征着寻求更高智慧、遵循传统价值观或寻找精神导师。',
    reversedMeaning: '可能暗示打破常规、质疑传统或个人信仰的探索。逆位时可能需要找到自己的精神道路。',
    description: '教皇身穿法袍，坐在两位信徒之间，手持三重十字权杖，象征连接天、地、人三界。',
    advice: '寻求智慧的指引，但也要建立自己的信念体系。',
    element: '土',
    zodiac: '金牛座'
  },
  {
    id: 6,
    name: '恋人',
    nameEn: 'The Lovers',
    arcana: 'major',
    number: 6,
    keywords: ['爱情', '选择', '和谐', '价值观'],
    uprightMeaning: '代表爱情、伙伴关系和重要的选择。恋人牌不仅关于浪漫，更关于价值观的契合和人生重大决定。',
    reversedMeaning: '可能暗示关系不和谐、错误选择或价值观冲突。逆位时需要重新审视你的选择和关系。',
    description: '一对恋人站在天使的祝福下，背景是伊甸园，象征纯洁的爱与神圣的结合。',
    advice: '跟随你的心，但确保你的选择符合你的价值观。',
    element: '风',
    zodiac: '双子座'
  },
  {
    id: 7,
    name: '战车',
    nameEn: 'The Chariot',
    arcana: 'major',
    number: 7,
    keywords: ['胜利', '意志力', '决心', '控制'],
    uprightMeaning: '代表通过意志力和决心获得胜利。战车象征着克服障碍、掌控局面和向前推进的力量。',
    reversedMeaning: '可能暗示失控、缺乏方向或内心冲突。逆位时需要重新找到前进的动力和方向。',
    description: '胜利者站在战车上，由两只狮身人面兽拉着，象征通过意志力控制相反的力量。',
    advice: '集中精力，坚定意志，胜利就在前方。',
    element: '水',
    zodiac: '巨蟹座'
  },
  {
    id: 8,
    name: '力量',
    nameEn: 'Strength',
    arcana: 'major',
    number: 8,
    keywords: ['勇气', '耐心', '内在力量', '温柔'],
    uprightMeaning: '代表内在力量、勇气和耐心。这张牌提醒你真正的力量来自于温柔和自控，而非暴力。',
    reversedMeaning: '可能暗示自我怀疑、软弱或失去控制。逆位时需要重新连接你的内在力量。',
    description: '一位女性温柔地驯服一只狮子，头上的无限符号象征永恒的精神力量。',
    advice: '以温柔和耐心面对挑战，你的内在力量比你想象的更强大。',
    element: '火',
    zodiac: '狮子座'
  },
  {
    id: 9,
    name: '隐士',
    nameEn: 'The Hermit',
    arcana: 'major',
    number: 9,
    keywords: ['内省', '独处', '指引', '智慧'],
    uprightMeaning: '代表内省、寻求真理和精神探索。隐士提醒你需要独处的时间来获得内在的智慧和指引。',
    reversedMeaning: '可能暗示孤立、拒绝帮助或迷失方向。逆位时可能需要重新与外界连接。',
    description: '一位智者站在山顶，手持灯笼照亮道路，象征智慧之光指引迷途的人。',
    advice: '给自己独处反思的时间，内在的答案正等待被发现。',
    element: '土',
    zodiac: '处女座'
  },
  {
    id: 10,
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    arcana: 'major',
    number: 10,
    keywords: ['命运', '转变', '周期', '机遇'],
    uprightMeaning: '代表命运的转折、好运和生命的周期。命运之轮提醒你变化是恒常的，现在是抓住机遇的时刻。',
    reversedMeaning: '可能暗示厄运、抗拒改变或感觉失控。逆位时需要接受生命的起伏。',
    description: '一个巨大的轮子旋转着，上面有不同的神话生物，象征命运的无常和生命的循环。',
    advice: '拥抱变化，相信命运的安排，好运正在降临。',
    element: '火',
    zodiac: '木星'
  },
  {
    id: 11,
    name: '正义',
    nameEn: 'Justice',
    arcana: 'major',
    number: 11,
    keywords: ['公正', '真相', '法律', '平衡'],
    uprightMeaning: '代表公正、真相和因果报应。正义牌提醒你诚实面对自己和他人，你的行为会有相应的后果。',
    reversedMeaning: '可能暗示不公正、不诚实或逃避责任。逆位时需要面对真相，承担责任。',
    description: '正义女神端坐宝座，一手持剑，一手持天平，象征公正与真理的力量。',
    advice: '以公正和诚实对待所有事物，真相终将大白。',
    element: '风',
    zodiac: '天秤座'
  },
  {
    id: 12,
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    arcana: 'major',
    number: 12,
    keywords: ['牺牲', '等待', '新视角', '放下'],
    uprightMeaning: '代表暂停、牺牲和获得新视角。倒吊人提醒你有时需要放下控制，从不同角度看待问题。',
    reversedMeaning: '可能暗示拖延、不必要的牺牲或拒绝改变视角。逆位时可能需要采取行动。',
    description: '一个人倒挂在树上，面容平静，头部散发光芒，象征通过牺牲获得启示。',
    advice: '暂停下来，换一个角度看问题，你会发现新的答案。',
    element: '水',
    zodiac: '海王星'
  },
  {
    id: 13,
    name: '死神',
    nameEn: 'Death',
    arcana: 'major',
    number: 13,
    keywords: ['结束', '转变', '重生', '释放'],
    uprightMeaning: '代表结束、深刻的转变和重生。死神牌很少指向实际的死亡，而是象征着必要的结束和新的开始。',
    reversedMeaning: '可能暗示抗拒改变、停滞不前或害怕结束。逆位时需要勇于放下过去。',
    description: '死神骑着白马，手持旗帜，象征着不可避免的转变和生命的循环。',
    advice: '不要害怕结束，每个结束都是新开始的种子。',
    element: '水',
    zodiac: '天蝎座'
  },
  {
    id: 14,
    name: '节制',
    nameEn: 'Temperance',
    arcana: 'major',
    number: 14,
    keywords: ['平衡', '耐心', '调和', '中庸'],
    uprightMeaning: '代表平衡、耐心和调和。节制牌提醒你在生活中寻找中庸之道，将不同的元素融合在一起。',
    reversedMeaning: '可能暗示失衡、过度或缺乏耐心。逆位时需要重新找到平衡点。',
    description: '天使站在水边，将水从一个杯子倒入另一个，象征着元素的调和与平衡。',
    advice: '保持耐心和平衡，和谐的融合将带来最好的结果。',
    element: '火',
    zodiac: '射手座'
  },
  {
    id: 15,
    name: '恶魔',
    nameEn: 'The Devil',
    arcana: 'major',
    number: 15,
    keywords: ['束缚', '欲望', '执着', '阴影'],
    uprightMeaning: '代表束缚、欲望和物质执着。恶魔牌提醒你审视那些控制你的事物，认识到你有选择的自由。',
    reversedMeaning: '可能暗示摆脱束缚、面对阴影或恢复自由。逆位时象征着解放的开始。',
    description: '恶魔坐在宝座上，两个被锁链束缚的人在他脚下，象征着欲望和执着的力量。',
    advice: '认识到束缚你的是什么，记住你始终有选择的自由。',
    element: '土',
    zodiac: '摩羯座'
  },
  {
    id: 16,
    name: '塔',
    nameEn: 'The Tower',
    arcana: 'major',
    number: 16,
    keywords: ['剧变', '破坏', '启示', '释放'],
    uprightMeaning: '代表突然的变化、破坏和启示。塔牌象征着虚假结构的崩塌，虽然痛苦但最终是解放性的。',
    reversedMeaning: '可能暗示避免灾难、内在转变或延迟不可避免的变化。逆位时变化可能更加渐进。',
    description: '雷电击中高塔，人们从中坠落，象征着虚假安全感的瓦解和真相的揭示。',
    advice: '接受突如其来的变化，它正在清除不再服务于你的事物。',
    element: '火',
    zodiac: '火星'
  },
  {
    id: 17,
    name: '星星',
    nameEn: 'The Star',
    arcana: 'major',
    number: 17,
    keywords: ['希望', '灵感', '平静', '更新'],
    uprightMeaning: '代表希望、灵感和精神更新。星星牌在困难后带来平静和治愈，象征着光明的未来。',
    reversedMeaning: '可能暗示失去希望、信心不足或与灵性断连。逆位时需要重新找到内心的光芒。',
    description: '一位裸体女性在星空下倒水入池，象征着纯洁的希望和宇宙的祝福。',
    advice: '保持希望，你正在经历精神的更新，光明就在前方。',
    element: '风',
    zodiac: '水瓶座'
  },
  {
    id: 18,
    name: '月亮',
    nameEn: 'The Moon',
    arcana: 'major',
    number: 18,
    keywords: ['幻象', '直觉', '潜意识', '恐惧'],
    uprightMeaning: '代表幻象、直觉和潜意识。月亮牌提醒你事情可能不如表面看起来那样，需要信任直觉穿越迷雾。',
    reversedMeaning: '可能暗示走出迷惑、释放恐惧或真相大白。逆位时混乱开始消散。',
    description: '月亮高悬，两只狗对月嚎叫，一只龙虾从水中爬出，象征着潜意识和幻象。',
    advice: '相信你的直觉，但也要警惕幻象，真相会在适当的时候揭示。',
    element: '水',
    zodiac: '双鱼座'
  },
  {
    id: 19,
    name: '太阳',
    nameEn: 'The Sun',
    arcana: 'major',
    number: 19,
    keywords: ['成功', '喜悦', '活力', '光明'],
    uprightMeaning: '代表成功、喜悦和光明。太阳是塔罗牌中最积极的牌之一，象征着幸福、成就和充满活力的生命。',
    reversedMeaning: '可能暗示暂时的阴霾、过度乐观或成功延迟。逆位时喜悦可能减弱但仍存在。',
    description: '灿烂的太阳照耀着一个骑马的孩子，向日葵盛开，象征着纯粹的喜悦和成功。',
    advice: '尽情享受这美好的时刻，你的努力正在开花结果。',
    element: '火',
    zodiac: '太阳'
  },
  {
    id: 20,
    name: '审判',
    nameEn: 'Judgement',
    arcana: 'major',
    number: 20,
    keywords: ['觉醒', '更新', '召唤', '反思'],
    uprightMeaning: '代表觉醒、反思和人生的召唤。审判牌象征着重要的决定时刻，是时候面对过去并拥抱新生。',
    reversedMeaning: '可能暗示自我怀疑、拒绝召唤或无法原谅自己。逆位时需要更深的自我反省。',
    description: '天使吹响号角，死者从坟墓中复活，象征着最终的审判和灵魂的觉醒。',
    advice: '倾听你灵魂的召唤，是时候做出重要的决定了。',
    element: '火',
    zodiac: '冥王星'
  },
  {
    id: 21,
    name: '世界',
    nameEn: 'The World',
    arcana: 'major',
    number: 21,
    keywords: ['完成', '圆满', '整合', '成就'],
    uprightMeaning: '代表完成、圆满和成就。世界牌是大阿卡纳的最后一张，象征着一个周期的完美结束和新旅程的开始。',
    reversedMeaning: '可能暗示未完成、延迟或缺乏closure。逆位时可能需要完成最后的步骤。',
    description: '一位舞者被花环环绕，四角有四种元素的象征，象征着宇宙的完整和谐。',
    advice: '庆祝你的成就，你已经完成了一个重要的旅程。新的冒险即将开始。',
    element: '土',
    zodiac: '土星'
  }
]

// 小阿卡纳 - 权杖牌组 (示例前几张)
export const wandsCards: TarotCard[] = [
  {
    id: 22,
    name: '权杖王牌',
    nameEn: 'Ace of Wands',
    arcana: 'minor',
    suit: 'wands',
    number: 1,
    keywords: ['新开始', '创造力', '灵感', '潜力'],
    uprightMeaning: '代表新的创意开始、灵感和充满可能的机遇。这是行动和创造的种子。',
    reversedMeaning: '可能暗示延迟、缺乏方向或创意阻塞。',
    description: '一只手从云中伸出，握着一根发芽的权杖，象征新生的力量。',
    advice: '抓住这个新机会，你的创造力正蓄势待发。',
    element: '火'
  },
  {
    id: 23,
    name: '权杖二',
    nameEn: 'Two of Wands',
    arcana: 'minor',
    suit: 'wands',
    number: 2,
    keywords: ['计划', '决策', '发现', '进步'],
    uprightMeaning: '代表计划未来、做出决策和探索新领域的时刻。',
    reversedMeaning: '可能暗示缺乏规划、恐惧未知或决策困难。',
    description: '一个人站在城堡上，手持地球仪，眺望远方。',
    advice: '是时候制定计划并勇敢地探索新的可能性了。',
    element: '火'
  },
  {
    id: 24,
    name: '权杖三',
    nameEn: 'Three of Wands',
    arcana: 'minor',
    suit: 'wands',
    number: 3,
    keywords: ['扩展', '远见', '领导', '探索'],
    uprightMeaning: '代表扩展视野、等待回报和商业发展的好时机。',
    reversedMeaning: '可能暗示延迟、缺乏远见或计划受阻。',
    description: '一个人站在悬崖上，看着远方的船只，象征等待收获。',
    advice: '你的努力即将获得回报，保持耐心和信心。',
    element: '火'
  }
]

// 小阿卡纳 - 圣杯牌组
export const cupsCards: TarotCard[] = [
  {
    id: 36,
    name: '圣杯王牌',
    nameEn: 'Ace of Cups',
    arcana: 'minor',
    suit: 'cups',
    number: 1,
    keywords: ['新感情', '爱', '直觉', '灵性'],
    uprightMeaning: '代表新的情感开始、爱的萌芽和精神上的满足。',
    reversedMeaning: '可能暗示情感阻塞、失去爱或内心空虚。',
    description: '一只手托着溢出五道水流的圣杯，象征情感的丰盈。',
    advice: '敞开心扉，接受新的情感体验。',
    element: '水'
  },
  {
    id: 37,
    name: '圣杯二',
    nameEn: 'Two of Cups',
    arcana: 'minor',
    suit: 'cups',
    number: 2,
    keywords: ['合作', '吸引', '伙伴', '和谐'],
    uprightMeaning: '代表深厚的连接、浪漫关系或重要的伙伴关系。',
    reversedMeaning: '可能暗示关系失衡、分离或误解。',
    description: '两个人交换圣杯，上方有双蛇杖象征，代表结合。',
    advice: '珍惜这份特别的连接，它是难得的缘分。',
    element: '水'
  },
  {
    id: 38,
    name: '圣杯三',
    nameEn: 'Three of Cups',
    arcana: 'minor',
    suit: 'cups',
    number: 3,
    keywords: ['庆祝', '友谊', '社交', '合作'],
    uprightMeaning: '代表庆祝、友谊和社交活动的愉快时光。',
    reversedMeaning: '可能暗示过度放纵、社交问题或孤立。',
    description: '三位女性举杯庆祝，象征友谊和共同的喜悦。',
    advice: '与朋友分享喜悦，庆祝生活中的美好时刻。',
    element: '水'
  }
]

// 小阿卡纳 - 宝剑牌组
export const swordsCards: TarotCard[] = [
  {
    id: 50,
    name: '宝剑王牌',
    nameEn: 'Ace of Swords',
    arcana: 'minor',
    suit: 'swords',
    number: 1,
    keywords: ['清晰', '真相', '突破', '正义'],
    uprightMeaning: '代表思维的清晰、真相的揭示和智识上的突破。',
    reversedMeaning: '可能暗示混乱的思维、错误判断或争论。',
    description: '一把剑从云中伸出，剑尖戴着王冠，象征思想的胜利。',
    advice: '以清晰的头脑面对真相，它将给你力量。',
    element: '风'
  },
  {
    id: 51,
    name: '宝剑二',
    nameEn: 'Two of Swords',
    arcana: 'minor',
    suit: 'swords',
    number: 2,
    keywords: ['僵局', '选择', '平衡', '回避'],
    uprightMeaning: '代表艰难的选择、僵局或需要做出决定的时刻。',
    reversedMeaning: '可能暗示信息揭示、做出决定或情绪释放。',
    description: '一位蒙眼女性交叉持剑，背对大海，象征内心的矛盾。',
    advice: '勇敢面对你需要做出的选择，不要继续回避。',
    element: '风'
  },
  {
    id: 52,
    name: '宝剑三',
    nameEn: 'Three of Swords',
    arcana: 'minor',
    suit: 'swords',
    number: 3,
    keywords: ['心痛', '悲伤', '分离', '真相'],
    uprightMeaning: '代表心痛、悲伤和情感上的创伤，但也象征治愈的开始。',
    reversedMeaning: '可能暗示走出悲伤、释放痛苦或复原。',
    description: '三把剑刺穿一颗心，雨滴落下，象征悲伤和痛苦。',
    advice: '允许自己感受悲伤，这是治愈的第一步。',
    element: '风'
  }
]

// 小阿卡纳 - 星币牌组
export const pentaclesCards: TarotCard[] = [
  {
    id: 64,
    name: '星币王牌',
    nameEn: 'Ace of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    number: 1,
    keywords: ['机遇', '繁荣', '新起点', '物质'],
    uprightMeaning: '代表物质上的新机遇、繁荣和稳定基础的开始。',
    reversedMeaning: '可能暗示错失机会、财务问题或缺乏规划。',
    description: '一只手从云中伸出，托着一枚金色星币，背景是繁茂的花园。',
    advice: '抓住这个带来物质保障的机会。',
    element: '土'
  },
  {
    id: 65,
    name: '星币二',
    nameEn: 'Two of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    number: 2,
    keywords: ['平衡', '适应', '灵活', '优先'],
    uprightMeaning: '代表在多个责任间保持平衡，需要灵活应对变化。',
    reversedMeaning: '可能暗示失衡、财务压力或无法应对。',
    description: '一个人在杂耍两个星币，形成无限符号，背景是起伏的海浪。',
    advice: '在各项事务间找到平衡，保持灵活。',
    element: '土'
  },
  {
    id: 66,
    name: '星币三',
    nameEn: 'Three of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    number: 3,
    keywords: ['团队', '技艺', '学习', '合作'],
    uprightMeaning: '代表团队合作、技能的发展和工作中的成就。',
    reversedMeaning: '可能暗示缺乏团队协作、平庸或工作问题。',
    description: '一位工匠在教堂中工作，两人在旁观察指导，象征技艺的精进。',
    advice: '与他人合作，精进你的技能。',
    element: '土'
  }
]

// 合并所有塔罗牌
export const allTarotCards: TarotCard[] = [
  ...majorArcana,
  ...wandsCards,
  ...cupsCards,
  ...swordsCards,
  ...pentaclesCards
]

// 获取随机牌
export function drawRandomCards(count: number): { card: TarotCard; isReversed: boolean }[] {
  const shuffled = [...allTarotCards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(card => ({
    card,
    isReversed: Math.random() > 0.5
  }))
}
