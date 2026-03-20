import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  feed,
  sidebar,
}: {
  children: ReactNode;
  feed: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div>
      <Link href={"/parallel"}>parallel</Link>
      <br />
      <Link href={"/parallel/setting"}>parallel/setting</Link>
      <hr />
      {children}
      {feed}
      {sidebar}
    </div>
  );
}
