import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** 소개·약관 등 글 위주 페이지의 공통 껍데기 */
export function Prose({
  title,
  lead,
  trail,
  children,
}: {
  title: string;
  lead?: string;
  trail: Crumb[];
  children: ReactNode;
}) {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs trail={trail} />
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h1>
      {lead && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{lead}</p>
      )}
      <div className="mt-10 max-w-2xl space-y-10">{children}</div>
    </Container>
  );
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-fg-muted">
        {children}
      </div>
    </section>
  );
}
