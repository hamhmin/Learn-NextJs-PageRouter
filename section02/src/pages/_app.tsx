import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
    // router.replace("/test"); // 뒤로가기를 방지하는 이동방식
    // router.back(); // 뒤로가기
  };

  useEffect(() => {
    // next에서 지원하는 Link태그가 아닌 프로그래미틱하게 페이지 이동을 구현하면
    // prefetch를 컴포넌트를 마운트 시키는 시점에서 따로 진행시켜줘야 prefetch가 작동함.
    // 그리고 prefetch는 개발모드에서 작동하지않아 프로덕트로 실행시켜줘야함
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        {/* Link태그에 prefetch={false}를 적용하면 해당 Link태그는 prefetch를 작동하지않음 */}
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
