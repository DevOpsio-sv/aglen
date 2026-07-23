import { images, negotiablePrice } from "./shared";
import type { PageCopy } from "./types";

export const zh: PageCopy = {
  nav: { home: "首页", about: "关于阿格伦", landmarks: "地点", stay: "住宿", quests: "AR任务", events: "活动", business: "本地商家" },
  ui: { languageLabel: "语言", languageSelectAria: "选择语言", modalCloseAria: "关闭", mobileMenuAria: "菜单" },
  brand: { name: "阿格伦", subtitle: "维特河畔的村庄" },
  hero: {
    meta: "保加利亚北部 · 维特河 · 卢科维特 · 卡尔卢科沃",
    title: "阿格伦",
    subtitle: "维特河畔的隐秘宝藏",
    lede: "在保加利亚北部腹地，探索峡谷、洞穴、河潭和令人惊叹的自然奇观。阿格伦是散步、摄影、钓鱼以及在自然中度过宁静周末的理想目的地。",
    primary: "探索阿格伦",
    secondary: "下载应用",
    cue: "发现河谷",
    imageAlt: "受阿格伦启发的、电影般的河流峡谷与乡村景观",
  },
  statsLabel: "为什么到访阿格伦",
  about: {
    eyebrow: "历史与地方记忆",
    title: "阿格伦岩石的秘密",
    text: "在阿格伦附近卢科维特喀斯特地区的石灰岩山体和数十座洞穴背后，隐藏着一段跨越千年地质变迁、色雷斯祭祀习俗与保加利亚民族复兴时期编年史的历史。请探索下方的层次。",
  },
  legends: {
    eyebrow: "阿格伦的传说与谜团",
    title: "在阿格伦周边的峡谷、洞穴和古老小径之间，每个地方都承载着自己的故事。",
    text: "这里最有力量的故事并不喧闹。它们藏在地名、洞穴门槛、奇特岩形和河流的转弯处。",
  },
  landmarks: {
    eyebrow: "待发现的地点",
    title: "阿格伦周边最美的地方",
    text: "从令人印象深刻的岩石景观、河潭，到全景视野和历史遗迹——在这里，自然与地方传说让每一次漫步都成为一次小小的发现。",
    aria: "阿格伦周边路线点",
  },
  experiences: {
    eyebrow: "体验",
    title: "以你自己的方式体验阿格伦",
    text: "选择漫步、摄影探险、钓鱼或在自然中度过周末，发现这片地区最精彩的一面。",
    cta: "咨询路线",
  },
  gallery: { eyebrow: "自然图库", title: "由河光与岩石讲述的地方", aria: "阿格伦图库" },
  stay: {
    eyebrow: "在阿格伦住宿",
    title: "留宿于自然之中",
    text: "选择一处宁静的住宿，以阿格伦为起点，探索这片地区丰富的自然宝藏。",
  },
  quests: {
    eyebrow: "保加利亚同类中的首创",
    title: "通往阿格伦的真实 AR 冒险",
    text: "Unlocking Bulgaria 会带你到真实地点——用手机看到隐藏的 3D 世界，解开谜题，追随守护者的线索。这不是模拟，也不是博物馆，而是真实的现场冒险。",
    cta: "下载并开始",
    features: [
      { id: "ar", title: "增强现实 (AR)", text: "这些地方隐藏着什么？将摄像头对准，看隐藏的世界在你眼前活起来。" },
      { id: "gps", title: "实时 GPS 任务", text: "哪个地点藏着下一条线索？跟随 GPS 任务前往阿格伦周边真实的地标。" },
      { id: "story", title: "换一种方式讲述的历史", text: "守护者是谁？古老的符号守护着什么？通过游戏揭开普罗霍德纳洞穴的传说。" },
    ],
  },
  ar: {
    eyebrow: "AR 冒险",
    title: "看见守护者的世界",
    text: "用手机摄像头唤醒普罗霍德纳的隐藏世界。AR 图层展现肉眼看不见的故事、符号和角色，但只在它们真实发生过的地点。",
    steps: [
      "下载应用",
      "前往阿格伦周边标记的 AR 地点",
      "举起摄像头，看见隐藏的世界",
    ],
    cta: "下载并开始",
  },
  app: {
    eyebrow: "下载应用",
    title: "Unlocking Bulgaria",
    text: "适用于 Android 的移动应用。在阿格伦周边寻找任务，踏上真实的冒险。",
    badge: "打开 Unlocking Bulgaria",
    note: "应用官方网站是 unlockingbulgaria.com/bg/。",
  },
  contact: {
    eyebrow: "规划访问",
    title: "规划你的访问",
    text: "联系我们，获取有关路线、景点、摄影地点、钓鱼、住宿以及在维特河畔度过难忘周末的信息与建议。",
    notesTitle: "访客提示",
    noteOne: "适合生态旅游、摄影、钓鱼、徒步路线、洞穴参观以及在保加利亚北部度过周末。摄影、河景、洞穴与地方记忆。",
    noteTwo: "请带上舒适的鞋子、水、防晒用品，并尊重当地的空间。",
    cta: "发送咨询",
  },
  events: {
    eyebrow: "日历",
    title: "阿格伦的活动",
    text: "阿格伦及维特河沿岸的节庆、村庄聚会、户外写生和季节性活动。请常来查看即将举行的日期。",
    emptyState: "近期活动即将公布。如果您在阿格伦组织或知道某项活动，欢迎与我们分享。",
    dateLabel: "时间",
    locationLabel: "地点",
    submitTitle: "有来自阿格伦的照片或消息吗？",
    submitText: "请向我们发送照片或活动信息。我们会在发布前审核每一份投稿。",
    submitCta: "分享照片 / 信息",
  },
  hub: {
    eyebrow: "旅游指南",
    title: "按兴趣、路线和附近地点规划阿格伦",
    text: "专题指南把目的地的核心故事与访客的意图连接起来：景点、旅游、钓鱼、洞穴、维特河、住宿、食物、季节更新和周边目的地。",
  },
  guides: {
    vitRiver: { label: "维特河指南", text: "维特河是这片地区的心脏，它众多的小径提供了成千上万适合散步、摄影、钓鱼和在自然中休憩的地方。" },
    fishing: { label: "维特河畔钓鱼", text: "维特河在保加利亚北部的自然之中提供美丽而宁静的钓鱼地点。" },
    hiking: { label: "徒步路线", text: "生态步道和路线带领访客前往阿格伦周边最美的自然景点。" },
    caves: { label: "洞穴与岩石形态", text: "阿格伦和卡尔卢科沃周边地区以其洞穴和令人印象深刻的石灰岩地貌而闻名。" },
    food: { label: "食物与本地产品", text: "品尝卢科维特地区特有的自制产品和传统风味。" },
    nearby: { label: "附近目的地", text: "将阿格伦之行与普罗霍德纳、卡尔卢科沃、伊斯克尔—帕内加、卢科维特及该地区的其他景点相结合。" },
    seasonal: { label: "季节指南", text: "关于路线、摄影、天气和安静周末规划的每月更新。" },
  },
  highlights: [
    { label: "隐秘保加利亚", value: "真实的体验", detail: "远离大众旅游，阿格伦提供宁静、美丽的自然和真正的保加利亚乡村感受。" },
    { label: "自然", value: "峡谷、洞穴与河流", detail: "村庄周边地区以石灰岩峭壁、洞穴、河潭以及保加利亚北部最美的自然景观之一而令人惊叹。" },
    { label: "身份", value: "唯一的“Ъ”", detail: "阿格伦是保加利亚唯一一个名字以字母“Ъ”开头的居民点。" },
  ],
  timeline: [
    {
      title: "岩石与洞穴之地",
      detail: "阿格伦周边的石灰岩峭壁和洞穴，构成了卢科维特和维特河地区最令人印象深刻的自然景观之一。",
      intro:
        "阿格伦村周边的维特河谷所守护的，远不止关于奥斯曼迫害和岩石桥梁的常规旅游传说。在卢科维特喀斯特地区这一段的石灰岩山体和数十座洞穴背后，隐藏着一段跨越千年地质变迁、色雷斯祭祀习俗和中世纪精神隐修主义的历史。",
      sections: [
        {
          heading: "1. 地质异常：为什么这里的岩石独一无二？",
          body: [
            "对卢科维特地区喀斯特地貌的地质研究表明，阿格伦周边的岩石并非普通的石灰岩，而是属于所谓的洛梅什和阿普里尔地层（主要来自下白垩纪）。",
            "地下水迷宫：维特河在这一段形成了独特的曲流，因为数百万年前它曾沿着构造断层流动。在如今的河床和岩体之下，存在着一整套地下虹吸管道和“干涸”通道的网络，洞穴学家至今仍未完全测绘。",
            "峡谷的小气候：某些地方高达 100 米的垂直峭壁创造出独特的热喀斯特小气候。由于峡谷深邃且有洞穴泉水，维特河畔低处的气温有时与高原上相差数度，这促使残遗植被和特有的喀斯特生物群落得以保存，早在 20 世纪初就已被植物学家研究。",
          ],
        },
        {
          heading: "2. 史前与色雷斯人的痕迹",
          body: [
            "尽管大众叙事大多聚焦于奥斯曼统治时期（例如塞利什特地区的悲剧以及沃洛瓦塔·杜普卡／奥奇拉塔洞穴），但阿格伦周边洞穴中的考古痕迹却指向更为久远的古代：",
            "在岩拱地带和洞穴周围，曾发现过零星的史前陶器碎片（主要来自铜石并用时代和早期青铜时代），这表明这些洞穴早在四五千年前就曾作为猎人和最早牧民的临时庇护所。",
            "与邻近的卡尔卢科沃—伊斯克尔地区类似，这里难以到达的岩石台地也曾被色雷斯部落（特里巴利人）用作露天圣所，与对水、岩石和地下力量的崇拜相关。该地区的喀斯特泉水曾被尊为具有疗愈之效。",
          ],
        },
        {
          heading: "3. 词源与古老登记册中的村名",
          body: [
            "阿格伦这个名字在保加利亚地名学中绝对独一无二——它是保加利亚唯一一个名字以字母“Ъ”开头的居民点。",
            "在 15 和 16 世纪的奥斯曼税务登记册中（记载尼科波尔桑贾克），出现过这个名字的早期变体，源自词根“глен”或“иглен”（据一些古老传说，因河流上方尖锐的岩针和岩齿，该村落最初被称为“Иглен град голяма”）。",
            "保加利亚民族复兴时期的古老地理记载将阿格伦描述为不仅仅是一个小村庄，而是穿越前巴尔干山地的商队路线上的战略要地，商人们依靠天然的岩石屏障来防御盗匪的袭击。",
          ],
        },
        {
          heading: "4. 文学与精神记忆：特里丰·库内夫",
          body: [
            "在阿格伦的民俗和文化记忆中，一个占据特殊地位的事实是：著名的保加利亚作家、政论家和讽刺小品文作家特里丰·库内夫（生于 1880 年）就出生在这里。",
            "他的回忆和早期作品承载着阿格伦岩石那严酷而如画的自然所特有的气质。在这些石灰岩巨人和维特河的荫庇下成长，他后来把不屈与抗争的感受注入到他标志性的文章以及对极权政权的抵抗之中，也因此在 1944 年之后于劳改营中经历了严峻的磨难。研究其创作的学者常将他深厚的道德脊梁与他故乡那“铁一般”而不可接近的自然联系在一起。",
          ],
        },
      ],
    },
    {
      title: "人们发现河谷",
      detail: "河畔优越的条件自古以来吸引着人们，使这片地区成为生活与往来的天然之所。",
    },
    {
      title: "村庄的出现",
      detail: "随着时间推移，一个与河流、土地和传统紧密相连的社区逐渐形成，这些至今仍是阿格伦特质的一部分。",
    },
    {
      title: "故事与记忆",
      detail: "地方传说、习俗和记忆让村庄的精神保持鲜活，并在过去与现在之间建立起联系。",
    },
    {
      title: "今日阿格伦",
      detail: "阿格伦的未来在于保持真实。如今，这个村庄是自然爱好者、摄影爱好者、钓鱼者以及宁静周末出行者青睐的目的地。",
    },
  ],
  mysteries: [
    { title: "河流引路之处", tag: "隐藏的路径", image: images.hero, description: "维特河不会一次展示全部。转弯、阴影和岩石让漫步变成一场探寻。" },
    { title: "洞穴的世界", tag: "石与静", image: images.cave, description: "阿格伦和卡尔卢科沃周边的洞穴是该地区最令人印象深刻的自然奇观之一，它们保存着镌刻在岩石中的数百万年历史。" },
    { title: "讲述故事的名字", tag: "民俗景观", image: images.arch, description: "杜普卡塔、斯隆切托和拉奇科夫·维尔等地名，把自然景观变成一个容易被记住的地方。" },
  ],
  placesList: [
    { id: "dupkata", title: "杜普卡塔", tag: "岩石拱门", image: images.caveCard, imageAlt: "阿格伦附近可眺望石灰岩景观的岩石之窗", description: "维特河上方的天然石拱，是阿格伦周边最上镜的地点之一。" },
    { id: "sloncheto", title: "斯隆切托", tag: "岩石形象", image: images.hero, imageAlt: "阿格伦附近的峡谷、河流和石灰岩峭壁", description: "一处奇特的岩石形态，已成为该地区的标志之一。" },
    { id: "chervena-stena", title: "切尔韦纳·斯特纳", tag: "峡谷景观", image: images.riverSunsetCard, imageAlt: "阿格伦附近日落时分的维特河，伴有岩石和树木", description: "由岩石和河流塑造的峡谷景观，令人叹为观止。" },
    { id: "rachkov-vir", title: "拉奇科夫·维尔", tag: "河潭", image: images.nearbyRetreatCard, imageAlt: "卢科维特和阿格伦附近，有木屋和石灰岩河岸的宁静水域", description: "风景如画的河潭，适合休息、拍照、天然河中泡浴和钓鱼。" },
    { id: "st-archangel-michael", title: "圣大天使米迦勒", tag: "村庄记忆", image: images.church, imageAlt: "乡村教堂、石砌街道和绿色山谷", description: "一座历史悠久的教堂，守护着村庄的精神遗产，建于 1888 年，以纪念在土耳其人袭击中遇难的当地居民。" },
    { id: "kaleto", title: "卡莱托", tag: "考古", image: images.kaleto, imageAlt: "峡谷与河流上方山丘上的石质遗迹", description: "一处与该地区古老历史和维特河谷古道相关的地方。" },
  ],
  experiencesList: [
    { id: "canyonWalk", title: "峡谷漫步", price: negotiablePrice.zh, duration: "2-3 小时", bestFor: "首次到访", description: "穿行于维特河畔岩石、河景和自然景点之间的路线。" },
    { id: "photoTour", title: "河畔摄影之旅", price: negotiablePrice.zh, duration: "半天", bestFor: "摄影师", description: "村庄周边最适合风光和自然摄影的地点。" },
    { id: "fishing", title: "维特河畔钓鱼", price: negotiablePrice.zh, duration: "2 小时", bestFor: "慢旅行", description: "河畔宁静的地方，让你以最纯粹的方式享受自然。" },
    { id: "weekendEscape", title: "阿格伦周末逃离", price: negotiablePrice.zh, duration: "2 天", bestFor: "情侣与朋友", description: "两天沉浸在自然、地方故事和美丽风景之中。" },
    { id: "herbs", title: "草药与乡村智慧", price: negotiablePrice.zh, duration: "90 分钟", bestFor: "好奇的旅行者", description: "认识当地自然的丰饶以及关于草药的传统知识。" },
    { id: "schoolDay", title: "学生探索日", price: negotiablePrice.zh, duration: "1 天", bestFor: "学生团体", description: "一次融合自然、历史和地方传说的教育体验。" },
  ],
  galleryItems: [
    { title: "维特河峡谷", image: images.hero, alt: "日落时分的维特河，伴有岩石、树木和多石的河岸", size: "wide" },
    { title: "石拱", image: images.arch, alt: "河流上方的天然石灰岩拱门", size: "standard" },
    { title: "洞穴之光", image: images.cave, alt: "洞穴入口，可望见河流与岩石", size: "tall" },
    { title: "隐秘河谷上方", image: images.aerial, alt: "河流、岩石与村庄的航拍视角", size: "wide" },
    { title: "卢科维特附近的河畔休憩", image: images.nearbyRetreat, alt: "卢科维特和阿格伦附近，有漂浮木屋的宁静水景", size: "standard" },
  ],
  mapStops: [
    { title: "村庄中心", detail: "散步从阿格伦的心脏出发——广场、教堂和守护着村庄灵魂的古老房屋。" },
    { title: "维特河边小路", detail: "沿着维特河流，走过风景如画的河岸、遮荫的树木，欣赏美丽的岩石景色。" },
    { title: "杜普卡塔", detail: "阿格伦最具标志性的自然符号之一——一座令人印象深刻的岩石拱门，历经数千年由自然塑造而成。" },
    { title: "洞穴与岩石奇观", detail: "发现喀斯特地貌的隐秘世界——洞穴、岩石地貌和拥有无与伦比氛围的地方。" },
  ],
  accommodationList: [
    { title: "客房", type: "乡村住宿", description: "当地民居中的宁静住宿，靠近自然与河流。", image: images.church },
    { title: "露营地", type: "露营", description: "供搭帐篷的开放空间，可通往维特河和自然步道。", image: images.aerial },
    { title: "山间别墅", type: "别墅", description: "一座可俯瞰峡谷的僻静别墅，适合小团体和周末逃离。", image: images.pool },
  ],
  sourceNotes: ["由 DevOpsio 创建 - www.devopsio.eu", "所有图片来自当地摄影师，并已获授权使用。"],
};
