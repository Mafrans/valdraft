import { ComponentChildren } from "preact";

type PrimaryLayoutProps = {
  children: ComponentChildren;
};

export function PrimaryLayout({ children }: PrimaryLayoutProps) {
  return <div class="container my-20">{children}</div>;
}
