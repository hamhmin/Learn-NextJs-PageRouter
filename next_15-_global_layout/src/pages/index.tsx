// import "./index.css"; // nextjs는 app 컴포넌트가 아닌 곳에서 css파일을 호출하는것을 막는다.

// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
// CSS Module을 사용하면 불러올 수 있으며
// className에 불러온 style.(css에서 지정한 선택자)로 작성하면 다른 컴포넌트와 중복되지않게 알아서 적용한다.

import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  //  getServerSideProps == 약속된 이름의 함수, ssr로 작동함.
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
  // return 값 방식도 프레임워크에 의해 강제된다.
  // 서버에서만 실행되기에 console.log가 브라우저에서 보이지 않음, window.location 과 같은 브라우저를 읽는 js 사용 불가함.
  // window.location;
  console.log("서버");
  const data = "hello";
  return {
    props: {
      data,
    },
  };
};

export default function Home(
  // type은 InferGetServerSidePropsType를 불러와 사용하고, getServerSideProps의 타입을 추론하게 한다.
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // ssr 방식으로 작동하도록 설정했기때문에 getServerSideProps함수 외의 해당 컴포넌트에서도
  // 브라우저를 읽는 window 코드를 사용할 수 없다.
  // console.log(window);

  // 컴포넌트가 마운트 되는 시점부터는 브라우저영역이기에 window 사용이 가능하다.
  useEffect(() => {
    console.log(window);
  }, []);

  console.log(props.data);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// hetLayout으로 감싸주는게 가능함
// Home에서만 서치인풋 컴포넌트를 적용한 사례.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
