# 계산기 플랫폼 (web)

Next.js 15 App Router + TypeScript + Tailwind CSS 4.

```bash
npm install
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드 (전 페이지 정적 생성)
npm run typecheck
npm test           # 계산 로직 단위 테스트
```

## 설계 원칙

**계산기 하나 = 레지스트리 항목 하나.** 페이지, 허브 목록, sitemap,
메타데이터가 전부 레지스트리에서 파생되므로 라우트 파일을 직접 만들 일이 없다.

메타데이터와 계산 로직은 의도적으로 분리돼 있다.

| | 위치 | 쓰는 곳 |
|---|---|---|
| 메타데이터 | `lib/registry/meta.ts` | 서버 — 허브 목록, `generateMetadata`, sitemap |
| 계산 로직 | `lib/registry/runtime/<slug>.ts` | 클라이언트 — 동적 import 되는 폼 + 계산식 |

메타는 직렬화 가능한 데이터만 담아 서버 컴포넌트에서 쓰고, 함수가 들어가는
런타임은 slug별 청크로 쪼개 필요한 것만 브라우저로 내려보낸다.

## 계산기 추가하기

1. `lib/registry/meta.ts` 에 항목 추가 (처음엔 `published: false`)
2. `lib/registry/runtime/<slug>.ts` 작성 — `fields`(폼 스키마) + `compute`(순수 함수)
3. `lib/registry/runtime/index.ts` 의 `loaders` 에 한 줄 등록
4. `lib/registry/__tests__/<slug>.test.ts` 에 계산식 테스트 작성
5. `meta.ts` 의 `published: true` 로 전환

UI는 건드리지 않는다. `fields` 스키마만 주면 `CalcShell` 이 입력 폼, 입력값
저장, 결과 카드를 전부 만들어 낸다.

### 계산 로직은 순수 함수로

세금·노무 계산은 틀리면 서비스 신뢰가 끝난다. `compute` 안에 식을 직접 쓰지
말고, 화면과 무관한 순수 함수(`computeCompound` 같은)로 빼고 테스트를 붙인 뒤
`compute` 에서는 포맷팅만 한다. `lib/registry/runtime/compound-interest.ts` 참고.

## SEO

타이틀 공식은 `lib/seo.ts` 의 `buildTitle` 이 강제한다.

```
{계산기명} {연도?} | {키워드 다발} | {브랜드}
```

- 연도는 `SITE.baseYear` 한 곳에서 주입된다. 해가 바뀌면 이 상수만 올리면
  `yearSensitive: true` 인 계산기 전부에 반영된다.
- 브랜드명·도메인은 `lib/site.ts` 에서만 관리한다.
- `sitemap.ts` 는 레지스트리를 순회해 자동 생성된다. 손으로 URL을 넣지 말 것.
- 카테고리가 어긋난 URL(`/calculators/tax/compound-interest`)은 404를 반환해
  중복 색인을 막는다.

## 디자인 토큰

`app/globals.css` 의 CSS 변수 한 곳에서 라이트/다크 팔레트를 정의하고
`@theme inline` 으로 Tailwind 색상에 연결한다. 색을 바꾸려면 `:root` 와 `.dark`
블록만 고치면 된다.

## 남은 일

- 계산기 본체 구현 (`meta.ts` 의 `published: false` 항목들)
- 전역 검색, 최근 사용·즐겨찾기
- i18n (`/en`) 라우팅
- 공공데이터 조회 허브
