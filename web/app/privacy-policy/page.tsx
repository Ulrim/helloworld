import type { Metadata } from "next";
import { Prose, Section } from "@/components/Prose";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `개인정보처리방침 | ${SITE.brandSuffix}`,
  description: `${SITE.name}가 수집하는 정보와 처리 방식, 이용자의 권리를 안내합니다.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Prose
      title="개인정보처리방침"
      lead="서비스는 계산기 이용을 위해 회원가입을 요구하지 않으며, 입력값을 서버에 저장하지 않습니다. 시행 전 법률 검토가 필요한 초안입니다."
      trail={[
        { name: "홈", path: "/" },
        { name: "개인정보처리방침", path: "/privacy-policy" },
      ]}
    >
      <Section heading="1. 수집하는 정보">
        <p>
          서비스는 회원가입 절차가 없어 이름, 연락처 등 개인을 식별할 수 있는
          정보를 직접 수집하지 않습니다. 서비스 개선을 위해 접속 기기 종류,
          브라우저 정보, 방문 경로 등 통계 목적의 비식별 정보가 자동으로 생성될
          수 있습니다.
        </p>
      </Section>

      <Section heading="2. 계산기 입력값의 처리">
        <p>
          이용자가 계산기에 입력한 값은 이용자의 브라우저 저장소에만 보관되며
          서버로 전송되지 않습니다. 브라우저의 사이트 데이터를 삭제하면 저장된
          값도 함께 지워집니다.
        </p>
      </Section>

      <Section heading="3. 쿠키와 유사 기술">
        <p>
          서비스는 화면 설정(예: 다크 모드)을 기억하기 위해 브라우저 저장소를
          사용합니다. 광고와 이용 통계를 위해 제3자 도구가 쿠키를 사용할 수
          있으며, 이용자는 브라우저 설정에서 쿠키 저장을 거부할 수 있습니다.
        </p>
      </Section>

      <Section heading="4. 처리의 위탁">
        <p>
          서비스는 안정적인 운영을 위해 호스팅, 콘텐츠 전송, 이용 통계, 광고
          게재 업무를 외부 사업자에게 위탁할 수 있습니다. 위탁 사업자 목록은
          변경 시 본 방침에 반영합니다.
        </p>
      </Section>

      <Section heading="5. 이용자의 권리">
        <p>
          이용자는 언제든지 브라우저에 저장된 값을 직접 삭제할 수 있으며,
          개인정보 처리와 관련한 문의를 아래 연락처로 보낼 수 있습니다.
        </p>
      </Section>

      <Section heading="6. 문의처">
        <p>{SITE.contactEmail}</p>
      </Section>
    </Prose>
  );
}
