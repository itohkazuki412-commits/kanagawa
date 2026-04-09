export const siteData = {
  meta: {
    title: 'JLS合同会社 | 宅配ドライバー採用サイト',
    description:
      '横浜・川崎エリアを中心に、未経験から始めやすい宅配ドライバー募集サイトです。',
  },
  company: {
    name: 'JLS合同会社',
    subName: 'DRIVER RECRUIT',
    tel: '09000000000',
    telDisplay: '090-0000-0000',
    mail: 'recruit@example.com',
    address: '神奈川県横浜市中区みなとみらい 1-2-3',
    copyright: '© 2026 JLS合同会社 All Rights Reserved.',
  },
  navigation: [
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work-style' },
    { label: 'INCOME', href: '#simulator' },
    { label: 'VOICE', href: '#voice' },
    { label: 'FLOW', href: '#flow' },
    { label: 'FAQ', href: '#faq' },
  ],
  hero: {
    label: 'RECRUITMENT SITE',
    titleLead: '街と人をつなぐ配送を、',
    titleStrong: '誇れる仕事に。',
    description:
      'JLS合同会社は、軽貨物配送を軸に、横浜エリアを中心とした宅配案件をご案内しています。未経験からでも始めやすい教育体制と、生活に合わせやすい働き方で、長く続けられる現場づくりを大切にしています。',
    primaryCta: {
      label: '応募する',
      href: '#contact',
    },
    secondaryCta: {
      label: '収入シミュレーション',
      href: '#simulator',
    },
  },
  heroMetrics: [
    { label: '日給', value: '15,000円〜' },
    { label: '置き配中心', value: '8割' },
    { label: '稼働日数', value: '8〜28日' },
  ],
  heroSlides: [
    {
      image: 'media/hero-slide-1.jpg',
      alt: '荷物を確認する配送スタッフ',
    },
    {
      image: 'media/hero-slide-2.jpg',
      alt: '配送車の横で準備するスタッフ',
    },
    {
      image: 'media/hero-slide-3.jpg',
      alt: '倉庫で積み込みを行うイメージ',
    },
  ],
  about: {
    image: 'media/hero-slide-2.jpg',
    alt: '配送業務の準備をするイメージ',
    copy:
      '宅配案件が中心なので、決まった流れを覚えやすく、未経験からでも仕事のイメージを掴みやすいのが特徴です。置き配中心の案件も多く、最初の導入や稼働後の相談も含めて、現場に入る前から不安を減らせるような体制を整えています。',
  },
  aboutStats: [
    { value: '50+', label: '名在籍' },
    { value: '80%', label: '置き配中心' },
    { value: '3', label: '日で最短稼働' },
  ],
  timeline: [
    { time: '08:00', title: '営業所へ集合', description: '荷物や当日の配送ルートを確認します。' },
    { time: '09:30', title: '午前便スタート', description: '置き配中心のエリアを回り、リズムをつくります。' },
    { time: '13:00', title: '休憩・再積み込み', description: '午後便に向けて無理のないペースで調整します。' },
    { time: '15:00', title: '午後便対応', description: '日中の再配達や追加分を進めていきます。' },
    { time: '19:00', title: '業務終了', description: '報告を行い、その日の業務を締めます。' },
  ],
  workImage: {
    image: 'media/hero-slide-1.jpg',
    alt: '配送現場をイメージした写真',
  },
  requirements: [
    { label: '職種', value: '宅配ドライバー（業務委託）' },
    { label: '報酬', value: '日給 15,000円〜' },
    { label: '対応エリア', value: '横浜市・川崎市を中心に神奈川県内' },
    { label: '募集状況', value: '※現在「宅配」のみ募集中' },
  ],
  income: {
    dailyPay: 15000,
    minDays: 8,
    maxDays: 28,
    defaultDays: 22,
    bonuses: [
      { threshold: 20, amount: 20000, label: '20日以上' },
      { threshold: 15, amount: 10000, label: '15日以上' },
    ],
    note: '※上記は目安です。案件内容やエリア、稼働条件により変動します。',
  },
  voices: [
    {
      name: 'M. SATO',
      role: '20代 / 未経験スタート',
      quote:
        '置き配中心のルートから入れたので、配送の仕事が初めてでも流れを掴みやすかったです。相談しながら日数も調整できています。',
      image: 'media/member-1.jpg',
      alt: '女性ドライバーのイメージ',
    },
    {
      name: 'K. TANAKA',
      role: '30代 / 前職は接客業',
      quote:
        '目標月収から逆算して案件を組んでもらえたので、働き方のイメージが持ちやすかったです。稼働後も相談しやすいです。',
      image: 'media/member-2.jpg',
      alt: '男性ドライバーのイメージ',
    },
    {
      name: 'R. SUZUKI',
      role: '40代 / ベテランドライバー',
      quote:
        '安定して働ける案件がありつつ、生活に合わせて日数を調整できるのが魅力です。長く続けやすい現場だと感じます。',
      image: 'media/member-3.jpg',
      alt: 'ベテランドライバーのイメージ',
    },
  ],
  flowSteps: [
    {
      no: '01',
      title: '応募',
      body: '電話・LINE・フォームからご連絡ください。まずは相談だけでも問題ありません。',
    },
    {
      no: '02',
      title: '面談',
      body: '希望エリアや稼働日数、収入イメージを伺いながら案件をご案内します。',
    },
    {
      no: '03',
      title: '研修・説明',
      body: '配送の流れや注意点、現場での動き方を事前に共有します。',
    },
    {
      no: '04',
      title: '稼働開始',
      body: '準備が整い次第スタート。稼働後も随時相談しながら進められます。',
    },
  ],
  faq: [
    {
      question: '車がなくても応募できますか？',
      answer:
        '車両相談がしやすい前提で構成しています。持ち込み希望の方も、これから用意したい方もまずはご相談ください。',
    },
    {
      question: '未経験でも応募できますか？',
      answer:
        '可能です。最初は置き配中心の案件や流れを掴みやすい現場からご案内し、段階的に慣れていけるようにしています。',
    },
    {
      question: 'どれくらい稼げるか不安です。',
      answer:
        'サイト内の収入シミュレーターで目安を確認しつつ、希望日数に応じて案件の組み方をご相談いただけます。',
    },
    {
      question: '副業でも働けますか？',
      answer:
        '現在は宅配案件を中心に募集していますが、日数の相談は可能です。本業との兼ね合いも含めて面談時にご相談ください。',
    },
  ],
  contact: {
    lineUrl: '#contact-form',
    lineLabel: 'LINEで相談',
    phoneLabel: '電話で応募',
    formNote: '送信ボタンを押すと、入力内容を添えたメール作成画面が開きます。',
  },
} as const;
