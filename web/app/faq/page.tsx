import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `자주 묻는 질문 | 이용 방법·정확도·개인정보 | ${SITE.brandSuffix}`,
  description: `${SITE.name} 이용 방법과 계산 정확도, 입력값 저장 방식에 대해 자주 묻는 질문을 모았습니다.`,
  path: "/faq",
});

const FAQ = [
  {
    q: "회원가입을 해야 사용할 수 있나요?",
    a: "아닙니다. 모든 계산기는 회원가입이나 설치 없이 무료로 사용할 수 있습니다.",
  },
  {
    q: "입력한 값은 어디에 저장되나요?",
    a: "사용하시는 브라우저에만 저장됩니다. 서버로 전송되지 않으며, 브라우저의 사이트 데이터를 지우면 함께 삭제됩니다.",
  },
  {
    q: "계산 결과를 그대로 신고나 계약에 써도 되나요?",
    a: "계산 결과는 참고용입니다. 개인의 상황에 따라 적용되는 공제와 예외가 달라질 수 있으므로, 실제 신고나 계약 전에는 관계 기관이나 전문가의 확인을 받으시기 바랍니다.",
  },
  {
    q: "세율이나 요율이 바뀌면 언제 반영되나요?",
    a: "법령과 고시 개정이 확인되는 대로 검토해 반영합니다. 계산기마다 참고한 자료의 출처를 하단에 표기하고 있으니 함께 확인해 주세요.",
  },
  {
    q: "계산 결과가 다른 곳과 다릅니다.",
    a: "적용한 공제 항목이나 기준 시점이 다를 수 있습니다. 계산기 하단의 계산 근거와 안내 문구를 먼저 확인해 주시고, 그래도 차이가 있으면 문의해 주세요.",
  },
  {
    q: "원하는 계산기가 없습니다.",
    a: "필요한 계산기를 알려 주시면 우선순위에 반영합니다. 자주 요청되는 주제부터 순차적으로 추가하고 있습니다.",
  },
];

export default function FaqPage() {
  return (
    <Prose
      title="자주 묻는 질문"
      trail={[
        { name: "홈", path: "/" },
        { name: "자주 묻는 질문", path: "/faq" },
      ]}
    >
      <dl className="space-y-5">
        {FAQ.map((item) => (
          <div key={item.q} className="rounded-xl border border-border bg-surface p-5">
            <dt className="font-semibold text-fg">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
      <JsonLd data={faqJsonLd(FAQ)} />
    </Prose>
  );
}
