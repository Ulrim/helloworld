export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // 구조화 데이터는 우리가 만든 객체만 직렬화하므로 외부 입력이 섞이지 않는다
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
