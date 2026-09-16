# 모아툴(mowatool.com) 분석 및 클론 설계서

> 조사일: 2026-09-16
> 조사 방법: 검색엔진 인덱스(제목·메타디스크립션·URL) 기반 역설계.
> **제약**: 현재 세션의 이그레스 정책이 `www.mowatool.com:443`을 차단(403)하여
> 실제 HTML/CSS/JS를 직접 수집하지 못했습니다. 아래 "미확인 항목" 참조.

---

## 1. 서비스 정체성

| 항목 | 내용 |
|---|---|
| 서비스명 | 모아툴 / Mowatool |
| 도메인 | www.mowatool.com |
| 홈 타이틀 | `모아툴: 세금·투자·부동산·생활 계산기 모음 · 공식 데이터 기반` |
| 한 줄 정의 | 한국 실생활 특화 올인원 계산기 플랫폼 |
| 시작 | 2024년. 복리 계산기 1개 → 환율·세금·부동산·노무로 확장 |
| 규모 | 자체 표기 "38개+ 전문 계산기" (실제 인덱싱된 상세 URL은 그보다 훨씬 많음) |
| 과금 | 전면 무료. 회원가입·설치 없음 |
| 상태 저장 | 입력값을 브라우저에 저장(localStorage 추정), 재방문 시 복원 |

**수익 모델(추정)**: 회원/결제 동선이 없고, 개인정보처리방침에 Google 위탁이 명시됨
→ **광고(AdSense) 기반 + SEO 롱테일 트래픽**이 사실상 유일한 엔진.
즉 이 사이트의 본질은 "계산기"가 아니라 **검색 유입 머신**이다. 클론 시 이 점이 가장 중요.

---

## 2. 기술 스택 (사이트가 /features, /about 에서 자진 공개)

- **Next.js 15** — App Router + Server Components, SSR/SSG 혼용
- **TypeScript** 전면 적용 (복잡한 계산 로직을 타입 시스템으로 관리한다고 명시)
- **Tailwind CSS** — 유틸리티 기반 디자인 시스템, **다크모드 네이티브 지원**, 모바일~데스크톱 완전 반응형
- **인프라**: Vercel(호스팅) · Cloudflare(CDN/DNS) · Google(Analytics/Ads)
  — 개인정보처리방침의 "처리 위탁" 목록에서 확인
- **데이터 파이프라인**: 환율·세금 등 실시간 데이터를 **API 스케줄러로 주기 갱신**,
  법령 개정 시 즉시 검증·배포

> 클론 스택을 Next.js 15 + TS + Tailwind로 잡은 것은 원본과 동일 구성이며,
> SEO가 이 서비스의 심장이므로 SSG/SSR이 없는 스택(Flutter Web, CSR SPA)은 사실상 실패한다.

---

## 3. 정보구조(IA) · URL 설계

### 3.1 정적 페이지
```
/                     홈
/about                모아툴 소개 — "모든 계산을 한 곳에서 해결하는 올인원 계산 플랫폼"
/features             핵심 특징 — "정확성과 신뢰를 중심으로 진화하는 모아툴의 특징"
/faq                  자주 묻는 질문
/terms                이용약관
/privacy-policy       개인정보처리방침
```

### 3.2 계산기 (2-depth 허브 → 상세)
```
/calculators/{category}            카테고리 허브
/calculators/{category}/{slug}     계산기 상세
```

**카테고리 9종 (확인됨)**

| slug | 한글명 | 허브 타이틀 부제 |
|---|---|---|
| `finance` | 투자·재무 | 복리·환율·대출이자·연금 |
| `tax` | 세금·급여 | 소득세·부가세·연말정산·4대보험 |
| `real-estate` | 부동산 | (취득세·양도세·중개보수·주담대) |
| `employment` | 근로·노동 | 연차·주휴수당·퇴직금·실업급여 |
| `auto` | 자동차 | (통행료·자동차세·EV·블랙박스) |
| `life` | 실생활 | 날짜·나이·경조사비·각종 요금 |
| `health` | 건강 | (본인부담금·급여한도) |
| `education` | 교육 | (학점 등) |
| `utilities` | 생활 도구 | 단위변환·비밀번호·QR·이미지 변환 |

### 3.3 데이터 허브 (계산기와 분리된 별도 섹션)
```
/medical-data/non-covered              비급여 진료비 조회·견적 비교 (심평원 공개가격)
/medical-data/non-covered/{procedure}  예: /shockwave-therapy
```
심평원 공개 데이터를 정규화해 **검색(시술명·코드·기관명) + 집계범위 선택(기관/지역/기관종별/전국)**
으로 제공. "심평원 공식 서비스가 아님"을 고지.
→ **계산기 외에 '공공데이터 조회 허브'라는 제2 축**이 존재. 클론 시 확장 포인트.

### 3.4 다국어
```
/en/calculators/real-estate/capital-gains-tax
```
→ 한국어는 prefix 없음(default locale), 영어는 `/en` prefix. Next.js i18n 라우팅 표준형.

### 3.5 확인된 실제 slug 표본
| 카테고리 | slug |
|---|---|
| finance | `compound-interest`, `dividend-yield`, `deposit-pledge-vs-early-termination` |
| tax | `overseas-resident-tax`, `salary-tax-exempt` |
| real-estate | `mortgage-loan`, `brokerage-fee`, `capital-gains-tax` |
| employment | `self-employed-employment-insurance`, `construction-worker-retirement-mutual-aid`, `housekeeper-agency-vs-direct-hire-cost` |
| auto | `highway-toll`, `ev-battery-lifetime-cost`, `dashcam-buy-vs-subscription-tco`, `freight-plate-lease-vs-purchase` |
| life | `airline-mileage-award-vs-cash-value` |
| health | `home-bath-service-copay`, `stoma-urology-supplies-coverage-budget` |
| education | `grade` |
| utilities | `unit-converter`, `password-generator`, `income-tax-calculator`, `working-hours` |

---

## 4. SEO 전략 — 이 사이트의 진짜 코어 ★

클론에서 **반드시 복제해야 할 것은 디자인이 아니라 이 패턴**이다.

### 4.1 타이틀 공식
```
{계산기명} | {키워드 다발} | 모아툴
```
실제 예시:
- `전기차 배터리 수명·교체 비용 계산기 | 2026년 SOH 시뮬레이션 | 모아툴`
- `급여 비과세 항목 최적화 계산기 | 2026년 소득세·4대보험 절감 | Mowatool`
- `고속도로 통행료 계산기 | 노선별·차종별 통행료 자동 계산 | 모아툴`
- `예금 중도해지 vs 예금담보대출 순비용 계산기 | 세후 손실·손익분기 금리 | 모아툴`

특징:
1. **연도 키워드 삽입** (`2026년`, `2026`) → 매년 갱신되는 "신선도" 시그널
2. **중간점(·)으로 키워드 압축** → 한 타이틀에 검색어 3~5개 동시 타게팅
3. 브랜드 접미사가 `모아툴` / `Mowatool` 혼용 (표기 일관성이 깨진 지점 — 클론에선 통일할 것)

### 4.2 롱테일 양산 공식: "A vs B + 손익분기"
반복 등장하는 템플릿형 계산기:
- 블랙박스 **구매 vs 구독·렌탈** 총비용 TCO 비교
- 영업용 번호판 **지입 대 매입** — 3년 순비용·월 손익분기 매출
- 가사도우미 **업체 vs 직접고용** 총노무비 — 비용·손익분기
- 예금 **중도해지 vs 예금담보대출** 순비용 — 손익분기 금리
- 항공 마일리지 **발권 vs 유상구매** 가치 — 보너스항공권 손익분기

→ 「두 선택지의 총비용을 기간별로 적분하고 손익분기점을 뽑는다」는 **단일 엔진**을
파라미터만 바꿔 수십 개 페이지로 찍어내는 구조. 극도로 효율적인 콘텐츠 양산 전략이며,
경쟁 사이트가 없는 초롱테일 키워드를 독식한다.

### 4.3 허브-스포크 내부링크
카테고리 허브가 굵은 키워드(`퇴직금 계산기`)를 흡수 → 상세 페이지로 링크주스 분배.
허브 메타디스크립션도 키워드 나열형으로 최적화되어 있음.

---

## 5. 신뢰성 포지셔닝 (E-E-A-T)

홈 타이틀에 **"공식 데이터 기반"**을 박아 넣을 정도로 신뢰를 전면에 세운다.
명시된 출처:

| 영역 | 출처 |
|---|---|
| 세금 | 국세청, 홈택스 |
| 노동 | 고용노동부, 최저임금위원회 |
| 금융/환율 | 한국은행, 환율 API, 금융감독원 |
| 법령 | 법제처 국가법령정보센터 |
| 의료 | 건강보험심사평가원(심평원) |

추가 주장: "공식 문헌으로 공식 재검증", "계산 단위 표준화",
"법령 개정 즉시 반영", "변경 이력 내부 문서화".

→ 클론 시에도 **각 계산기 하단 '근거/출처' 블록**은 필수 컴포넌트. 구글이 YMYL
(돈·건강 주제)로 분류하는 영역이라 출처 표기 없이는 순위가 안 나온다.

---

## 6. UX 패턴

- **전 계산기 동일 레이아웃**: 같은 입력 흐름 + 같은 결과 카드 → 학습비용 0
- **다크모드** 기본 지원
- **입력값 브라우저 저장** → 재방문 시 이어서 사용
- **회원가입·로그인 없음** → 서버 DB·인증·세션이 전혀 불필요
  = 클론 난이도를 극적으로 낮추는 요소. 백엔드는 환율/공공데이터 캐싱용 최소 API만 필요.

---

## 7. 클론 설계 제안 (Next.js 15 + TS + Tailwind)

### 7.1 디렉토리
```
web/
  app/
    layout.tsx
    page.tsx                                   # 홈
    (static)/about|features|faq|terms|privacy-policy/page.tsx
    calculators/
      page.tsx                                 # 전체 계산기 인덱스
      [category]/
        page.tsx                               # 허브 (generateStaticParams)
        [slug]/page.tsx                        # 상세 (generateStaticParams + generateMetadata)
    medical-data/non-covered/...
    sitemap.ts  robots.ts  opengraph-image.tsx
  lib/
    registry/          # 계산기 메타 레지스트리 (단일 진실 소스)
    calc/              # 순수 계산 함수 (UI와 완전 분리, 단위테스트 대상)
    sources/           # 출처 상수 (국세청/한국은행/...)
  components/
    CalcShell.tsx      # 입력폼 + 결과카드 공통 셸
    ResultCard.tsx  SourceNote.tsx  Disclaimer.tsx
    CategoryGrid.tsx  SearchCommand.tsx  ThemeToggle.tsx
```

### 7.2 핵심 설계 원칙
1. **데이터 드리븐 레지스트리**: 계산기 1개 = `{ slug, category, title, keywords, year,
   inputs[], compute(), sources[] }` 객체 1개. 페이지는 전부 이 레지스트리에서 생성.
   → 계산기 추가가 "객체 하나 추가"로 끝나야 롱테일 양산이 가능.
2. **계산 로직은 순수 함수**로 격리 + Vitest 테스트 필수 (세금·노무는 틀리면 신뢰가 끝난다).
3. `generateMetadata`에서 타이틀 공식을 **코드로 강제** (연도는 상수에서 주입 → 매년 1줄 수정).
4. **SSG 우선**. 환율 등 동적 데이터만 ISR(`revalidate`) 또는 클라이언트 fetch.
5. 입력 상태는 `useLocalStorage` 훅으로 slug별 네임스페이스 저장.
6. `sitemap.ts`가 레지스트리를 순회해 자동 생성 — 수동 관리 금지.
7. JSON-LD 구조화 데이터: `SoftwareApplication` + `FAQPage` + `BreadcrumbList`.

### 7.3 우선순위 로드맵
- **P0**: 레이아웃/헤더/푸터/다크모드, 레지스트리 뼈대, 카테고리 허브 9개, sitemap/robots
- **P1**: 트래픽 큰 계산기 10개 (복리, 대출이자, 퇴직금, 연차, 실수령액, 주휴수당,
  취득세, 양도세, 중개보수, 4대보험)
- **P2**: 유틸리티 도구 (단위변환·QR·비밀번호·색상) — 계산 로직이 단순해 빠르게 페이지 수 확보
- **P3**: "A vs B 손익분기" 엔진 → 롱테일 양산
- **P4**: i18n(`/en`), 공공데이터 조회 허브

---

## 8. 법적 유의사항 (중요)

| 대상 | 복제 가능 여부 |
|---|---|
| 계산 공식 자체 (세법·노동법 산식) | ✅ 법령·사실이므로 저작권 대상 아님 |
| 사이트 구조·URL 패턴·기능 아이디어 | ✅ 아이디어는 보호 대상 아님 |
| SEO 타이틀 공식 | ✅ 방식은 차용 가능 (문구 그대로 복사는 ❌) |
| **본문 카피·설명문·FAQ 문구** | ❌ 그대로 복사 시 저작권 침해 + 중복콘텐츠로 SEO 자멸 |
| **로고·브랜드명(모아툴/Mowatool)** | ❌ 상표 문제 |
| **CSS/이미지/JS 번들 그대로 복제** | ❌ |

→ **권장**: IA·기능·SEO 전략은 벤치마킹하고, **브랜드·카피·디자인은 100% 새로 작성**.
중복 콘텐츠는 법적 문제 이전에 검색 순위에서 원본에 밀려 트래픽이 0이 된다.

---

## 9. 미확인 항목 (이그레스 차단 해제 후 수집 필요)

1. 실제 디자인 토큰 — 브랜드 컬러, 폰트(Pretendard 추정), 반경/간격 스케일
2. 헤더/푸터 실제 메뉴 구성, 글로벌 검색 UI 유무
3. 홈 히어로 카피 원문 및 섹션 순서
4. 계산기 상세 페이지의 실제 레이아웃(입력 폼 ↔ 결과 카드 배치, 광고 슬롯 위치)
5. `/sitemap.xml` 전체 — 정확한 계산기 개수와 전 slug 목록
6. 구조화 데이터(JSON-LD) 실제 구현
7. Core Web Vitals / 번들 구성

**수집 방법**: 환경 설정에서 `mowatool.com`을 이그레스 허용목록에 추가 → **새 세션 시작**
(정책은 환경 단위라 실행 중 세션에는 반영되지 않음).
대안으로 브라우저에서 저장한 HTML을 레포에 올려주셔도 동일한 정밀도로 분석 가능합니다.
