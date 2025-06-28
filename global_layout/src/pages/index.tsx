// import "./index.css"; // nextjs는 app 컴포넌트가 아닌 곳에서 css파일을 호출하는것을 막는다.

// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
// CSS Module을 사용하면 불러올 수 있으며
// className에 불러온 style.(css에서 지정한 선택자)로 작성하면 다른 컴포넌트와 중복되지않게 알아서 적용한다.

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>index</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  );
}

// hetLayout으로 감싸주는게 가능함
// Home에서만 서치인풋 컴포넌트를 적용한 사례.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
