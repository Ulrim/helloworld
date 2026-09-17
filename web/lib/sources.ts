/**
 * 계산 근거 출처 마스터.
 * 돈·세금·건강(YMYL) 주제는 출처 표기가 검색 신뢰도의 핵심이므로
 * 모든 계산기가 여기서 출처를 참조한다.
 */
export interface Source {
  id: string;
  label: string;
  url: string;
}

export const SOURCES = {
  nts: { id: "nts", label: "국세청", url: "https://www.nts.go.kr/" },
  hometax: { id: "hometax", label: "홈택스", url: "https://www.hometax.go.kr/" },
  moel: { id: "moel", label: "고용노동부", url: "https://www.moel.go.kr/" },
  minimumWage: {
    id: "minimumWage",
    label: "최저임금위원회",
    url: "https://www.minimumwage.go.kr/",
  },
  bok: { id: "bok", label: "한국은행", url: "https://www.bok.or.kr/" },
  fss: { id: "fss", label: "금융감독원", url: "https://www.fss.or.kr/" },
  law: { id: "law", label: "국가법령정보센터", url: "https://www.law.go.kr/" },
  hira: { id: "hira", label: "건강보험심사평가원", url: "https://www.hira.or.kr/" },
  nhis: { id: "nhis", label: "국민건강보험공단", url: "https://www.nhis.or.kr/" },
  molit: { id: "molit", label: "국토교통부", url: "https://www.molit.go.kr/" },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;
