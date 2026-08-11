export const BRAND_INFO = {
  name: "바더만",
  englishName: "VATHEMAN",
  slogan: "자연소재 자연빛깔 자연염색 브랜드",
  subSlogan: "핸드메이드 / 자연(천연)염색 / 생활용품 / 바른가치를 더해 만드는 선물",
  officialUrl: "https://vatheman.com/",
  smartstoreUrl: "https://smartstore.naver.com/vatheman",
  instagramUrl: "https://www.instagram.com/vatheman_/",
  youtubeUrl: "https://www.youtube.com/@vatheman_",
  blogUrl: "https://blog.naver.com/vatheman",
  csPhone: "070-8095-2340",
  address: "경기 의정부시 범골로 137 (의정부동, 경기도일자리재단 여성능력개발본부)",
  companyOwner: "바더만 대표",
  shippingInfo: "70,000원 이상 구매 시 무료배송 (기본 배송비 3,500원)",
  email: "contact@vatheman.com"
};

export const MENU_ITEMS = [
  {
    title: "ABOUT",
    link: "#about",
    submenus: [
      { title: "BRAND (브랜드소개)", link: "#about-brand" },
      { title: "HISTORY (연혁)", link: "#about-history" },
      { title: "STORY (자연염색 스토리)", link: "#about-story" }
    ]
  },
  {
    title: "SHOP",
    link: "#shop",
    submenus: [
      { title: "ALL (전체상품)", link: "#shop-all" },
      { title: "롱텐실 스카프", link: "#shop-long" },
      { title: "사각텐실 스카프", link: "#shop-square" }
    ]
  },
  {
    title: "FAQ",
    link: "#faq",
    submenus: []
  },
  {
    title: "NOTICE",
    link: "#notice",
    submenus: []
  }
];

export const PRODUCTS_DATA = [
  {
    id: 1,
    name: "바더만 풋감 손염색 롱텐실 스카프",
    category: "롱텐실",
    categoryCode: "shop_01",
    dyeType: "감염 (Persimmon)",
    price: 89000,
    originalPrice: 110000,
    rating: 4.9,
    reviewsCount: 142,
    isBest: true,
    isNew: false,
    image: "/assets/images/product1.png",
    description: "제주 풋감 수액을 추출하여 수작업으로 염색한 100% 텐실 오가닉 롱스카프. 부드러운 드레이프성과 깊은 흙빛 그러데이션이 일상에품격을 더합니다.",
    details: ["소재: 텐실(Tencel) 100%", "염재: 국내산 풋감 수액 (자연 햇살 발색)", "사이즈: 180cm x 65cm", "세탁: 미온수 중성세제 단독 손세탁 추천"]
  },
  {
    id: 2,
    name: "바더만 천연 쪽염색 롱텐실 스카프",
    category: "롱텐실",
    categoryCode: "shop_01",
    dyeType: "쪽염 (Natural Indigo)",
    price: 89000,
    originalPrice: 110000,
    rating: 5.0,
    reviewsCount: 98,
    isBest: true,
    isNew: true,
    image: "/assets/images/hero.png",
    description: "깊은 바다와 밤하늘을 닮은 쪽염색 텐실 스카프. 항균 작용과 통기성이 뛰어나 피부에 닿았을 때 청량하고 쾌적함을 선사합니다.",
    details: ["소재: 텐실(Tencel) 100%", "염재: 천연 쪽 발효염", "사이즈: 180cm x 65cm", "특징: 항균, 소취 기능 유지"]
  },
  {
    id: 3,
    name: "바더만 풋감 자연빛깔 사각텐실 스카프",
    category: "사각텐실",
    categoryCode: "shop_02",
    dyeType: "감염 (Persimmon)",
    price: 68000,
    originalPrice: 85000,
    rating: 4.8,
    reviewsCount: 115,
    isBest: false,
    isNew: false,
    image: "/assets/images/product2.png",
    description: "단아하고 정사각형 핏으로 목에 두르기 편한 사각 텐실 스카프. 자연이 준 은은한 풋감의 브라운 톤이 어떠한 착장에도 잘 어우러집니다.",
    details: ["소재: 텐실(Tencel) 100%", "염재: 풋감 추출액", "사이즈: 90cm x 90cm"]
  },
  {
    id: 4,
    name: "바더만 강화 쑥염 롱텐실 스카프",
    category: "롱텐실",
    categoryCode: "shop_01",
    dyeType: "쑥염 (Mugwort)",
    price: 89000,
    originalPrice: 110000,
    rating: 4.9,
    reviewsCount: 76,
    isBest: false,
    isNew: true,
    image: "/assets/images/craft.png",
    description: "강화도 은쑥의 따스한 성질과 오가닉 그린 빛깔을 머금은 롱스카프. 사계절 부담 없이 어깨에 가볍게 걸치기 좋습니다.",
    details: ["소재: 텐실 100%", "염재: 강화도 쑥 엑기스", "사이즈: 180cm x 65cm"]
  },
  {
    id: 5,
    name: "바더만 보성 황토염 사각텐실 스카프",
    category: "사각텐실",
    categoryCode: "shop_02",
    dyeType: "황토염 (Red Clay)",
    price: 68000,
    originalPrice: 85000,
    rating: 4.7,
    reviewsCount: 62,
    isBest: false,
    isNew: false,
    image: "/assets/images/product2.png",
    description: "황토의 원적외선 기운과 자연 흙빛의 아늑함이 조화를 이루는 프리미엄 사각스카프. 부모님과 소중한 분을 위한 바른 가치의 선물입니다.",
    details: ["소재: 텐실 100%", "염재: 보성 청정 황토", "사이즈: 90cm x 90cm"]
  },
  {
    id: 6,
    name: "바더만 천연 락염 핑크 롱텐실 스카프",
    category: "롱텐실",
    categoryCode: "shop_01",
    dyeType: "락염 (Lac Red)",
    price: 95000,
    originalPrice: 120000,
    rating: 4.9,
    reviewsCount: 88,
    isBest: true,
    isNew: true,
    image: "/assets/images/product1.png",
    description: "자연의 붉은 보석 락(Lac) 염료로 물들인 화사한 로즈 파스텔 롱스카프. 우아한 연분홍 빛깔로 포인트를 주기 좋습니다.",
    details: ["소재: 텐실 100%", "염재: 천연 락 수지 염료", "사이즈: 180cm x 65cm"]
  }
];

export const HISTORY_TIMELINE = [
  { year: "2024.11", title: "바더만 공식 자사몰 (vatheman.com) 오픈 & 특허 출원" },
  { year: "2024.08", title: "경기도일자리재단 여성능력개발본부 아틀리에 입주" },
  { year: "2024.05", title: "네이버 스마트스토어 공식 오픈 및 천연염색 스카프 라인업 론칭" },
  { year: "2024.01", title: "자연소재 · 자연빛깔 브랜드 '바더만(VATHEMAN)' 창립" }
];

export const FAQS_DATA = [
  {
    q: "천연염색 제품은 어떻게 세탁해야 하나요?",
    a: "천연염색 제품은 화학 염료와 달라 미온수(30℃ 이하)에 중성세제를 풀어 가볍게 단독 손세탁 해주시는 것을 권장합니다. 염란이나 그늘에서 자연 건조해주시면 빛깔이 오래 보존됩니다."
  },
  {
    q: "세탁 시 물빠짐 현상이 발생하나요?",
    a: "초기 1~2회 세탁 시 천연 염재 고유의 미세한 잉여 염료 배출(물 빠짐)이 발생할 수 있으나, 이는 천연염색의 자연스러운 현상입니다. 이 과정을 거치면 색감이 부드럽고 안정적으로 정착됩니다."
  },
  {
    q: "배송 기간 및 배송비 조건은 어떻게 되나요?",
    a: "70,000원 이상 구매 시 무료배송(기본 배송비 3,500원)입니다. 주문 후 수작업 검수 및 친환경 포장 과정을 거쳐 평일 기준 1~3일 이내 안전하게 배송됩니다."
  },
  {
    q: "네이버 스마트스토어에서도 구매가 가능한가요?",
    a: "네, 바더만 공식 네이버 스마트스토어(smartstore.naver.com/vatheman)에서도 동일한 정품 제품과 혜택으로 구매하실 수 있습니다."
  }
];

export const CUSTOMERS_DATA = [
  {
    id: "CUST-1001",
    name: "김민서",
    gender: "여성",
    ageGroup: "30대",
    tier: "VVIP",
    purchaseCount: 8,
    totalAmount: 1240000,
    points: 37200,
    phone: "010-3849-1029",
    email: "minseo.kim@gmail.com",
    registeredAt: "2024-02-14",
    lastPurchasedAt: "2026-07-25",
    preferredDye: "감염 (Persimmon)",
    status: "활성"
  },
  {
    id: "CUST-1002",
    name: "박준혁",
    gender: "남성",
    ageGroup: "40대",
    tier: "VIP",
    purchaseCount: 5,
    totalAmount: 680000,
    points: 20400,
    phone: "010-9182-3741",
    email: "junhyuk.park@naver.com",
    registeredAt: "2024-05-20",
    lastPurchasedAt: "2026-07-27",
    preferredDye: "쪽염 (Indigo)",
    status: "활성"
  },
  {
    id: "CUST-1003",
    name: "이수진",
    gender: "여성",
    ageGroup: "50대 이상",
    tier: "VVIP",
    purchaseCount: 12,
    totalAmount: 1890000,
    points: 56700,
    phone: "010-2234-9981",
    email: "soojin.lee@hanmail.net",
    registeredAt: "2023-11-08",
    lastPurchasedAt: "2026-07-28",
    preferredDye: "황토염 (Red Clay)",
    status: "활성"
  },
  {
    id: "CUST-1004",
    name: "정유진",
    gender: "여성",
    ageGroup: "20대",
    tier: "GOLD",
    purchaseCount: 3,
    totalAmount: 260000,
    points: 7800,
    phone: "010-5512-8831",
    email: "yoojin.jung@kakao.com",
    registeredAt: "2025-01-15",
    lastPurchasedAt: "2026-06-18",
    preferredDye: "쑥염 (Mugwort)",
    status: "활성"
  },
  {
    id: "CUST-1005",
    name: "최성원",
    gender: "남성",
    ageGroup: "30대",
    tier: "SILVER",
    purchaseCount: 2,
    totalAmount: 147000,
    points: 4410,
    phone: "010-4491-0023",
    email: "sungwon.choi@naver.com",
    registeredAt: "2025-04-02",
    lastPurchasedAt: "2026-05-12",
    preferredDye: "쪽염 (Indigo)",
    status: "활성"
  },
  {
    id: "CUST-1006",
    name: "강지현",
    gender: "여성",
    ageGroup: "40대",
    tier: "GOLD",
    purchaseCount: 4,
    totalAmount: 410000,
    points: 12300,
    phone: "010-7718-2940",
    email: "jihyun.kang@gmail.com",
    registeredAt: "2024-09-19",
    lastPurchasedAt: "2026-07-22",
    preferredDye: "감염 (Persimmon)",
    status: "활성"
  },
  {
    id: "CUST-1007",
    name: "윤서연",
    gender: "여성",
    ageGroup: "20대",
    tier: "BRONZE",
    purchaseCount: 1,
    totalAmount: 89000,
    points: 2670,
    phone: "010-3321-4456",
    email: "seoyeon.yoon@naver.com",
    registeredAt: "2026-07-28",
    lastPurchasedAt: "2026-07-28",
    preferredDye: "감염 (Persimmon)",
    status: "신규"
  }
];

export const REALTIME_REGISTRATIONS = [
  { id: 1, name: "윤서연", email: "seoyeon***@naver.com", tier: "BRONZE", time: "방금 전 (16:10)", action: "신규 회원가입" },
  { id: 2, name: "오태양", email: "taeyang***@naver.com", tier: "BRONZE", time: "18분 전", action: "스마트스토어 연동가입" },
  { id: 3, name: "김민서", email: "minseo***@gmail.com", tier: "VVIP", time: "42분 전", action: "롱텐실 스카프 구매 (89,000원)" },
  { id: 4, name: "이수진", email: "soojin***@hanmail.net", tier: "VVIP", time: "1시간 전", action: "사각텐실 세트 구매 (68,000원)" }
];

export const SALES_TREND_DATA = [
  { month: "2월", 매출액: 1420, 자사몰: 610, 스마트스토어: 810, 주문건수: 95 },
  { month: "3월", 매출액: 1850, 자사몰: 820, 스마트스토어: 1030, 주문건수: 120 },
  { month: "4월", 매출액: 2100, 자사몰: 990, 스마트스토어: 1110, 주문건수: 142 },
  { month: "5월", 매출액: 2780, 자사몰: 1350, 스마트스토어: 1430, 주문건수: 188 },
  { month: "6월", 매출액: 3120, 자사몰: 1600, 스마트스토어: 1520, 주문건수: 210 },
  { month: "7월(현재)", 매출액: 3890, 자사몰: 2040, 스마트스토어: 1850, 주문건수: 265 }
];

export const CATEGORY_STATISTICS = [
  { name: "롱텐실 스카프", value: 48, amount: "1,867만원", color: "#0B318F" },
  { name: "사각텐실 스카프", value: 32, amount: "1,245만원", color: "#C47B59" },
  { name: "선물세트 & 소품", value: 20, amount: "778만원", color: "#D0B579" }
];

export const TIER_DISTRIBUTION = [
  { name: "VVIP 회원", count: 18, percentage: 15, color: "#8C533E" },
  { name: "VIP 회원", count: 32, percentage: 26, color: "#C47B59" },
  { name: "GOLD 회원", count: 42, percentage: 34, color: "#D0B579" },
  { name: "SILVER 회원", count: 19, percentage: 15, color: "#7A8B7B" },
  { name: "BRONZE 회원", count: 13, percentage: 10, color: "#A0AAB2" }
];
