import type { Category, CategoryId } from "./types";

export const CATEGORIES: Record<CategoryId, Category> = {
  finance: {
    id: "finance",
    title: "투자·재무 계산기",
    keywordLine: "복리·환율·대출이자·연금",
    description:
      "복리와 환율부터 대출 원리금, 연금·예적금까지 투자와 재무 설계에 필요한 계산을 한곳에 모았습니다.",
    icon: "📈",
    order: 1,
  },
  tax: {
    id: "tax",
    title: "세금·급여 계산기",
    keywordLine: "소득세·부가세·연말정산·4대보험",
    description:
      "월급 실수령액부터 종합소득세 신고까지, 과세표준 구간과 공제 항목을 자동 반영해 세액을 확인합니다.",
    icon: "🧾",
    order: 2,
  },
  "real-estate": {
    id: "real-estate",
    title: "부동산 계산기",
    keywordLine: "취득세·양도소득세·중개보수·주택담보대출",
    description:
      "집을 사고팔 때 드는 세금과 비용, 대출 한도와 상환액을 미리 계산해 자금 계획을 세웁니다.",
    icon: "🏠",
    order: 3,
  },
  employment: {
    id: "employment",
    title: "근로·노동 계산기",
    keywordLine: "연차·주휴수당·퇴직금·실업급여",
    description:
      "근로기준법을 기준으로 주휴수당, 연차 개수, 퇴직금, 실업급여를 계산해 제대로 받고 있는지 확인합니다.",
    icon: "💼",
    order: 4,
  },
  auto: {
    id: "auto",
    title: "자동차 계산기",
    keywordLine: "자동차세·취등록세·통행료·유지비",
    description:
      "취등록세와 자동차세부터 통행료, 유지비, 구매와 리스 비교까지 차량 관련 비용을 계산합니다.",
    icon: "🚗",
    order: 5,
  },
  life: {
    id: "life",
    title: "실생활 계산기",
    keywordLine: "날짜·나이·경조사비·각종 요금",
    description:
      "일상에서 헷갈리는 계산을 한 번에 끝냅니다. 날짜 사이의 일수, 만 나이, 축의금 적정액, 각종 요금을 빠르게 확인하세요.",
    icon: "🗓️",
    order: 6,
  },
  health: {
    id: "health",
    title: "건강 계산기",
    keywordLine: "BMI·칼로리·본인부담금·건강보험",
    description:
      "표준 체중과 칼로리부터 진료비 본인부담금까지, 건강과 의료비에 관한 수치를 계산합니다.",
    icon: "🩺",
    order: 7,
  },
  education: {
    id: "education",
    title: "교육 계산기",
    keywordLine: "학점·등급·학자금·교육비",
    description:
      "학점과 내신 등급 환산, 학자금 대출 상환까지 학업과 교육비 관련 계산을 돕습니다.",
    icon: "🎓",
    order: 8,
  },
  utilities: {
    id: "utilities",
    title: "생활 도구",
    keywordLine: "단위변환·비밀번호·QR·이미지 변환",
    description:
      "단위와 진법 변환, 비밀번호와 QR 생성, 색상과 텍스트 처리까지 업무와 일상을 돕는 무료 도구입니다.",
    icon: "🧰",
    order: 9,
  },
};

export const CATEGORY_LIST: Category[] = Object.values(CATEGORIES).sort(
  (a, b) => a.order - b.order,
);

export const CATEGORY_IDS = CATEGORY_LIST.map((c) => c.id);

export function isCategoryId(value: string): value is CategoryId {
  return value in CATEGORIES;
}
