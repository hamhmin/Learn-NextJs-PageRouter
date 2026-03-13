"use client";
// import ServerComponent from "./server-component";
export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("클라이언트컴포넌트");
  return <div>{children}</div>;
}
