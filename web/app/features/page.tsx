import type { Metadata } from "next";
import { Prose, Section } from "@/components/Prose";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} 핵심 특징 | 정확성·속도·일관된 사용성 | ${SITE.brandSuffix}`,
  description: `${SITE.name}가 계산 정확성과 속도, 일관된 사용성을 어떻게 확보하는지 설명합니다.`,
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <Prose
      title="핵심 특징"
      lead="정확한 결과를 빠르게, 그리고 어느 계산기에서나 같은 방식으로."
      trail={[
        { name: "홈", path: "/" },
        { name: "특징", path: "/features" },
      ]}
    >
      <Section heading="공개 자료에 근거한 계산식">
        <p>
          세율과 요율, 공제 한도 같은 값은 국세청, 고용노동부, 한국은행,
          금융감독원, 국가법령정보센터 등이 공개한 자료를 기준으로 합니다.
          계산기마다 어떤 자료를 참고했는지 하단에 링크로 표기합니다.
        </p>
      </Section>

      <Section heading="검증 가능한 계산 로직">
        <p>
          계산 로직은 화면과 분리한 순수 함수로 작성하고 단위 테스트를 함께
          둡니다. 값이 바뀌거나 식을 고칠 때 의도치 않은 변화가 생기면 테스트가
          먼저 잡아냅니다.
        </p>
      </Section>

      <Section heading="어느 계산기에서나 같은 사용 흐름">
        <p>
          입력 폼과 결과 카드의 구조를 모든 계산기가 공유합니다. 왼쪽에서 값을
          바꾸면 오른쪽 결과가 즉시 갱신되고, 결과 카드의 첫 줄에는 항상 가장
          중요한 수치가 옵니다.
        </p>
      </Section>

      <Section heading="빠른 로딩과 접근성">
        <p>
          대부분의 페이지를 미리 생성해 두어 첫 화면이 빠르게 뜹니다. 다크 모드를
          지원하고, 키보드만으로도 모든 입력에 접근할 수 있게 만들었습니다.
        </p>
      </Section>

      <Section heading="브라우저에 남는 입력값">
        <p>
          입력한 값은 사용하는 브라우저에만 저장됩니다. 다시 방문하면 마지막
          입력이 그대로 남아 있고, 서버에는 아무것도 전송되지 않습니다.
        </p>
      </Section>
    </Prose>
  );
}
