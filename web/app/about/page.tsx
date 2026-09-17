import type { Metadata } from "next";
import { Prose, Section } from "@/components/Prose";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} 소개 | 모든 계산을 한 곳에서 | ${SITE.brandSuffix}`,
  description: `${SITE.name}는 세금, 투자, 부동산, 근로, 생활 계산을 한 곳에 모은 무료 계산기 플랫폼입니다.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Prose
      title={`${SITE.name} 소개`}
      lead="계산할 때마다 사이트를 옮겨 다니지 않아도 되도록, 자주 쓰는 계산을 한곳에 모았습니다."
      trail={[
        { name: "홈", path: "/" },
        { name: "소개", path: "/about" },
      ]}
    >
      <Section heading="왜 만들었나">
        <p>
          세금 하나를 계산하려면 국세청에서 세율을 찾고, 다른 사이트에서 공제
          항목을 확인하고, 또 다른 계산기로 결과를 검산해야 했습니다. 필요한
          계산은 하나인데 거쳐야 할 화면은 여럿이었습니다.
        </p>
        <p>
          {SITE.name}는 그 과정을 한 페이지로 줄이는 것을 목표로 합니다. 입력
          흐름과 결과 화면을 모든 계산기에서 같게 맞춰, 처음 쓰는 계산기도 따로
          익힐 필요가 없게 만들었습니다.
        </p>
      </Section>

      <Section heading="무엇을 제공하나">
        <p>
          투자와 재무, 세금과 급여, 부동산, 근로, 자동차, 실생활, 건강, 교육,
          생활 도구까지 아홉 개 분야로 나누어 계산기를 제공합니다. 의사결정에
          자주 쓰이는 영역부터 차례로 넓혀 가고 있습니다.
        </p>
        <p>
          모든 계산기는 회원가입이나 설치 없이 무료로 쓸 수 있습니다. 입력한
          값은 브라우저에만 저장되므로 다시 방문해도 이어서 확인할 수 있고,
          서버로 전송되지 않습니다.
        </p>
      </Section>

      <Section heading="무엇을 약속하나">
        <p>
          계산식은 관계 기관이 공개한 자료와 법령을 기준으로 작성하고, 계산기마다
          참고한 출처를 페이지 하단에 밝힙니다. 법령이나 요율이 바뀌면 확인 후
          반영합니다.
        </p>
        <p>
          다만 계산 결과는 참고용입니다. 개인의 상황에 따라 적용되는 공제와
          예외가 달라질 수 있으므로, 중요한 판단 전에는 관계 기관이나 전문가의
          확인을 받으시기 바랍니다.
        </p>
      </Section>
    </Prose>
  );
}
