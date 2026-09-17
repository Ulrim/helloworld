import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-medium text-brand">404</p>
      <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
        찾을 수 없는 페이지입니다
      </h1>
      <p className="mt-3 text-sm text-fg-muted">
        주소가 바뀌었거나 아직 준비 중인 계산기일 수 있습니다.
      </p>
      <Link
        href="/calculators"
        className="mt-8 inline-block rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-fg transition hover:opacity-90"
      >
        전체 계산기 보기
      </Link>
    </Container>
  );
}
