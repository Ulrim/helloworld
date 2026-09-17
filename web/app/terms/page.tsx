import type { Metadata } from "next";
import { Prose, Section } from "@/components/Prose";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `이용약관 | ${SITE.brandSuffix}`,
  description: `${SITE.name} 서비스 이용약관입니다.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Prose
      title="이용약관"
      lead="본 약관은 서비스 이용 조건과 책임 범위를 정합니다. 시행 전 법률 검토가 필요한 초안입니다."
      trail={[
        { name: "홈", path: "/" },
        { name: "이용약관", path: "/terms" },
      ]}
    >
      <Section heading="제1조 (목적)">
        <p>
          본 약관은 {SITE.name}(이하 &ldquo;서비스&rdquo;)가 제공하는 온라인 계산
          도구의 이용 조건과 절차, 이용자와 서비스의 권리와 의무를 정하는 것을
          목적으로 합니다.
        </p>
      </Section>

      <Section heading="제2조 (서비스의 제공)">
        <p>
          서비스는 세금, 금융, 부동산, 근로, 생활 등 분야의 계산 도구를 무료로
          제공합니다. 서비스는 사전 고지 후 제공 내용을 변경하거나 중단할 수
          있으며, 긴급한 사유가 있는 경우 사후에 고지할 수 있습니다.
        </p>
      </Section>

      <Section heading="제3조 (계산 결과의 성격)">
        <p>
          서비스가 제공하는 모든 계산 결과는 공개된 자료와 법령을 토대로 한
          참고 정보이며, 세무·법률·투자·의료에 관한 자문이 아닙니다. 이용자는
          결과를 의사결정에 활용하기 전 관계 기관이나 전문가를 통해 확인할
          책임이 있습니다.
        </p>
      </Section>

      <Section heading="제4조 (책임의 제한)">
        <p>
          서비스는 계산 결과의 정확성을 위해 합리적인 노력을 다하지만, 법령
          개정이나 개별 사정으로 인한 차이가 발생할 수 있습니다. 서비스는 결과를
          신뢰해 발생한 손해에 대해 관련 법령이 허용하는 범위에서 책임을 지지
          않습니다.
        </p>
      </Section>

      <Section heading="제5조 (이용자의 의무)">
        <p>
          이용자는 서비스를 자동화된 방식으로 과도하게 호출하거나, 정상적인
          운영을 방해하는 행위를 해서는 안 됩니다. 서비스가 제공하는 콘텐츠를
          무단으로 복제해 재배포하는 것도 금지됩니다.
        </p>
      </Section>

      <Section heading="제6조 (약관의 변경)">
        <p>
          서비스는 필요한 경우 본 약관을 변경할 수 있으며, 변경 시 시행일과
          변경 내용을 서비스 화면에 게시합니다.
        </p>
      </Section>
    </Prose>
  );
}
