import type { CalculatorMeta } from "./types";

/**
 * 계산기 메타데이터 단일 진실 소스(single source of truth).
 *
 * 여기에 객체 하나를 추가하면 허브 목록 / 상세 페이지 / sitemap /
 * generateMetadata 가 전부 자동으로 따라온다. 계산 로직은
 * `lib/registry/runtime/<slug>.ts` 에 따로 두고 `published: true` 로 전환한다.
 *
 * 직렬화 가능한 데이터만 둘 것 — 서버 컴포넌트에서 import 된다.
 */
export const CALCULATORS: CalculatorMeta[] = [
  /* ---------------------------------------------------------------- *
   * finance — 투자·재무
   * ---------------------------------------------------------------- */
  {
    slug: "compound-interest",
    category: "finance",
    title: "복리 계산기",
    keywordLine: "원금·이자율·기간별 미래가치",
    description:
      "원금과 이자율, 기간을 넣으면 복리로 불어난 미래가치와 총이자를 계산합니다. 매월 적립식 납입과 이자 과세(15.4%)까지 반영합니다.",
    keywords: ["복리 계산기", "복리계산", "미래가치", "적금 복리", "이자 계산기"],
    sources: ["bok", "nts"],
    faq: [
      {
        q: "단리와 복리는 어떻게 다른가요?",
        a: "단리는 원금에만 이자가 붙지만, 복리는 이자에도 다시 이자가 붙습니다. 기간이 길수록 두 방식의 차이가 기하급수적으로 벌어집니다.",
      },
      {
        q: "이자소득세는 어떻게 계산되나요?",
        a: "일반 예적금 이자에는 소득세 14%와 지방소득세 1.4%를 합해 15.4%가 원천징수됩니다. 세후 금액을 보려면 과세 옵션을 켜세요.",
      },
    ],
    related: ["savings-goal", "loan-repayment"],
    published: true,
  },
  {
    slug: "loan-repayment",
    category: "finance",
    title: "대출 원리금 상환 계산기",
    keywordLine: "원리금균등·원금균등·거치기간 비교",
    description:
      "대출 금액과 금리, 기간을 입력해 원리금균등과 원금균등 상환의 월 납입액과 총이자를 비교합니다.",
    keywords: ["대출 계산기", "원리금균등", "원금균등", "대출이자 계산"],
    sources: ["fss", "bok"],
    related: ["compound-interest"],
    published: false,
  },
  {
    slug: "savings-goal",
    category: "finance",
    title: "목표 금액 적립 계산기",
    keywordLine: "목표액 달성에 필요한 월 저축액",
    description:
      "모으고 싶은 금액과 기간, 예상 수익률을 넣으면 매달 얼마를 저축해야 하는지 역산합니다.",
    keywords: ["적금 계산기", "목표 저축", "월 저축액 계산"],
    sources: ["bok"],
    related: ["compound-interest"],
    published: false,
  },
  {
    slug: "exchange-rate",
    category: "finance",
    title: "환율 계산기",
    keywordLine: "실시간 환율·환전 수수료 반영",
    description:
      "주요 통화의 환율로 환전 금액을 계산하고, 은행 환전 수수료(스프레드)를 반영한 실수령액을 확인합니다.",
    keywords: ["환율 계산기", "환전 계산", "달러 환율", "엔화 환율"],
    sources: ["bok"],
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * tax — 세금·급여
   * ---------------------------------------------------------------- */
  {
    slug: "salary-net-pay",
    category: "tax",
    title: "월급 실수령액 계산기",
    keywordLine: "4대보험·소득세 공제 후 실수령액",
    description:
      "연봉이나 월급을 넣으면 4대보험과 소득세를 공제한 실수령액을 계산합니다. 부양가족 수와 비과세액을 반영합니다.",
    keywords: ["실수령액 계산기", "월급 계산기", "연봉 실수령액", "세후 월급"],
    sources: ["nts", "nhis", "moel"],
    yearSensitive: true,
    related: ["four-major-insurance", "year-end-tax-settlement"],
    published: false,
  },
  {
    slug: "four-major-insurance",
    category: "tax",
    title: "4대보험 계산기",
    keywordLine: "국민연금·건강보험·고용보험·산재보험 요율",
    description:
      "보수월액을 기준으로 국민연금, 건강보험, 장기요양, 고용보험 보험료의 근로자·사업주 부담분을 각각 계산합니다.",
    keywords: ["4대보험 계산기", "국민연금 계산", "건강보험료 계산", "보험료 요율"],
    sources: ["nhis", "moel"],
    yearSensitive: true,
    published: false,
  },
  {
    slug: "year-end-tax-settlement",
    category: "tax",
    title: "연말정산 환급금 계산기",
    keywordLine: "공제 항목별 예상 환급·추가납부액",
    description:
      "총급여와 공제 항목을 넣어 연말정산 결과가 환급인지 추가납부인지 미리 확인합니다.",
    keywords: ["연말정산 계산기", "환급금 계산", "소득공제", "세액공제"],
    sources: ["nts", "hometax"],
    yearSensitive: true,
    published: false,
  },
  {
    slug: "vat",
    category: "tax",
    title: "부가가치세 계산기",
    keywordLine: "공급가액·세액 역산",
    description:
      "공급가액에서 부가세를, 또는 총액에서 공급가액과 세액을 역산합니다. 일반과세와 간이과세를 모두 지원합니다.",
    keywords: ["부가세 계산기", "부가가치세", "공급가액 계산", "간이과세"],
    sources: ["nts"],
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * real-estate — 부동산
   * ---------------------------------------------------------------- */
  {
    slug: "acquisition-tax",
    category: "real-estate",
    title: "취득세 계산기",
    keywordLine: "주택 수·조정지역별 취득세율",
    description:
      "주택 취득가액과 보유 주택 수, 조정대상지역 여부에 따른 취득세와 농특세, 지방교육세를 계산합니다.",
    keywords: ["취득세 계산기", "주택 취득세", "취득세율", "부동산 취득세"],
    sources: ["nts", "law"],
    yearSensitive: true,
    published: false,
  },
  {
    slug: "brokerage-fee",
    category: "real-estate",
    title: "부동산 중개보수 계산기",
    keywordLine: "거래금액 구간별 상한요율",
    description:
      "매매와 임대차 거래금액에 따른 중개보수 상한을 계산합니다. 주택, 오피스텔, 그 외 물건을 구분해 적용합니다.",
    keywords: ["중개수수료 계산기", "복비 계산", "중개보수 요율"],
    sources: ["molit", "law"],
    published: false,
  },
  {
    slug: "mortgage-loan",
    category: "real-estate",
    title: "주택담보대출 계산기",
    keywordLine: "LTV·DSR 한도와 월 상환액",
    description:
      "주택 가격과 소득을 기준으로 LTV와 DSR 규제 안에서 가능한 대출 한도와 월 상환액을 계산합니다.",
    keywords: ["주택담보대출 계산기", "LTV 계산", "DSR 계산", "대출 한도"],
    sources: ["fss", "bok"],
    yearSensitive: true,
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * employment — 근로·노동
   * ---------------------------------------------------------------- */
  {
    slug: "severance-pay",
    category: "employment",
    title: "퇴직금 계산기",
    keywordLine: "평균임금·재직일수 기준 퇴직금",
    description:
      "입사일과 퇴사일, 최근 3개월 임금을 넣으면 평균임금과 퇴직금, 퇴직소득세를 뺀 실수령액을 계산합니다.",
    keywords: ["퇴직금 계산기", "평균임금 계산", "퇴직소득세"],
    sources: ["moel", "law"],
    published: false,
  },
  {
    slug: "weekly-holiday-pay",
    category: "employment",
    title: "주휴수당 계산기",
    keywordLine: "주 15시간 이상 근로자 주휴수당",
    description:
      "주간 소정근로시간과 시급을 입력해 주휴수당 발생 여부와 금액을 확인합니다.",
    keywords: ["주휴수당 계산기", "주휴수당 조건", "알바 주휴수당"],
    sources: ["moel", "minimumWage"],
    yearSensitive: true,
    published: false,
  },
  {
    slug: "annual-leave",
    category: "employment",
    title: "연차 개수 계산기",
    keywordLine: "입사일 기준 연차 발생일수",
    description:
      "입사일을 기준으로 근로기준법에 따른 연차휴가 발생 일수와 가산 연차를 계산합니다.",
    keywords: ["연차 계산기", "연차 개수", "연차휴가 일수"],
    sources: ["moel", "law"],
    published: false,
  },
  {
    slug: "unemployment-benefit",
    category: "employment",
    title: "실업급여 계산기",
    keywordLine: "구직급여 일액·소정급여일수",
    description:
      "고용보험 가입기간과 연령, 평균임금으로 구직급여 일액과 총 수급 기간을 계산합니다.",
    keywords: ["실업급여 계산기", "구직급여", "실업급여 조건", "소정급여일수"],
    sources: ["moel"],
    yearSensitive: true,
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * auto — 자동차
   * ---------------------------------------------------------------- */
  {
    slug: "auto-tax",
    category: "auto",
    title: "자동차세 계산기",
    keywordLine: "배기량·차령별 자동차세와 연납 할인",
    description:
      "배기량과 차량 연식으로 연간 자동차세를 계산하고 연납 신청 시 할인 금액을 확인합니다.",
    keywords: ["자동차세 계산기", "자동차세 연납", "배기량 자동차세"],
    sources: ["law"],
    yearSensitive: true,
    published: false,
  },
  {
    slug: "fuel-cost",
    category: "auto",
    title: "유류비 계산기",
    keywordLine: "주행거리·연비 기준 주유비",
    description:
      "주행거리와 연비, 유가를 넣어 편도와 왕복 유류비를 계산합니다. 통행료를 더해 총 이동비도 확인합니다.",
    keywords: ["유류비 계산기", "주유비 계산", "연비 계산"],
    sources: ["molit"],
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * life — 실생활
   * ---------------------------------------------------------------- */
  {
    slug: "date-difference",
    category: "life",
    title: "날짜 계산기",
    keywordLine: "두 날짜 사이 일수·D-day",
    description:
      "두 날짜 사이의 일수를 세거나, 기준일에서 며칠 뒤 날짜를 구합니다. D-day 계산에 사용하세요.",
    keywords: ["날짜 계산기", "디데이 계산", "날짜 사이 일수"],
    sources: [],
    published: false,
  },
  {
    slug: "korean-age",
    category: "life",
    title: "만 나이 계산기",
    keywordLine: "생년월일 기준 만 나이·연 나이",
    description:
      "생년월일을 넣으면 만 나이와 연 나이를 동시에 보여줍니다. 각종 신청 자격 확인에 사용하세요.",
    keywords: ["만 나이 계산기", "나이 계산", "연 나이"],
    sources: ["law"],
    published: false,
  },
  {
    slug: "congratulatory-money",
    category: "life",
    title: "경조사비 계산기",
    keywordLine: "관계·상황별 축의금 적정액",
    description:
      "상대와의 관계와 참석 여부, 식사 여부를 기준으로 축의금과 부의금의 일반적인 범위를 제안합니다.",
    keywords: ["축의금 계산기", "부조금 얼마", "경조사비 적정액"],
    sources: [],
    published: false,
  },
  {
    slug: "electricity-bill",
    category: "life",
    title: "전기요금 계산기",
    keywordLine: "주택용 누진구간별 전기요금",
    description:
      "사용 전력량(kWh)으로 주택용 저압·고압 전기요금을 누진 구간에 따라 계산합니다.",
    keywords: ["전기요금 계산기", "누진세 계산", "전기세 계산"],
    sources: [],
    yearSensitive: true,
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * health — 건강
   * ---------------------------------------------------------------- */
  {
    slug: "bmi",
    category: "health",
    title: "BMI 계산기",
    keywordLine: "체질량지수·표준체중·비만도",
    description:
      "키와 몸무게로 체질량지수(BMI)와 대한비만학회 기준 비만도, 표준체중 범위를 확인합니다.",
    keywords: ["BMI 계산기", "체질량지수", "비만도 계산", "표준체중"],
    sources: ["nhis"],
    published: false,
  },
  {
    slug: "basal-metabolic-rate",
    category: "health",
    title: "기초대사량 계산기",
    keywordLine: "BMR·활동대사량·감량 목표 칼로리",
    description:
      "성별, 나이, 키, 몸무게로 기초대사량과 활동량을 반영한 일일 권장 칼로리를 계산합니다.",
    keywords: ["기초대사량 계산기", "BMR 계산", "칼로리 계산"],
    sources: [],
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * education — 교육
   * ---------------------------------------------------------------- */
  {
    slug: "gpa",
    category: "education",
    title: "학점 계산기",
    keywordLine: "4.5·4.3 만점 평점 환산",
    description:
      "과목별 학점과 성적을 입력해 평점 평균을 계산하고 4.5, 4.3, 4.0 만점 기준으로 환산합니다.",
    keywords: ["학점 계산기", "평점 계산", "GPA 환산", "4.5 만점"],
    sources: [],
    published: false,
  },

  /* ---------------------------------------------------------------- *
   * utilities — 생활 도구
   * ---------------------------------------------------------------- */
  {
    slug: "unit-converter",
    category: "utilities",
    title: "단위 변환기",
    keywordLine: "길이·무게·넓이·온도·부피 변환",
    description:
      "길이, 무게, 넓이, 온도, 부피 단위를 실시간으로 변환합니다. 평과 제곱미터 변환도 지원합니다.",
    keywords: ["단위 변환기", "평 제곱미터 변환", "단위 계산기"],
    sources: [],
    published: false,
  },
  {
    slug: "password-generator",
    category: "utilities",
    title: "비밀번호 생성기",
    keywordLine: "안전한 랜덤 비밀번호·패스프레이즈",
    description:
      "길이와 문자 종류를 골라 안전한 비밀번호를 생성합니다. 브라우저 안에서만 생성되며 서버로 전송되지 않습니다.",
    keywords: ["비밀번호 생성기", "랜덤 비밀번호", "패스워드 생성"],
    sources: [],
    published: false,
  },
  {
    slug: "qr-generator",
    category: "utilities",
    title: "QR 코드 생성기",
    keywordLine: "URL·텍스트 QR 생성 및 다운로드",
    description:
      "URL이나 텍스트로 QR 코드를 만들고 PNG 또는 SVG로 내려받습니다.",
    keywords: ["QR 코드 생성기", "QR 만들기", "큐알코드"],
    sources: [],
    published: false,
  },
];
