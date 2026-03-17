import BookItem from "@/components/book-item";
import style from "./page.module.css";
// import books from "@/mock/books.json";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";
//특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음.
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 Static 페이지 설정 (설정하면 안되는 이유를 -> 빌드시 오류 발생시킴)

async function AllBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    // { cache: "no-store" },
  );
  // console.log(response);
  if (!response.ok) {
    return <div>오류가 발생했습니다 ... index/.page.tsx fn:AllBooks</div>;
  }
  const allBooks: BookData[] = await response.json();
  // console.log(allBooks);
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    // { cache: "force-cache" },
    { next: { revalidate: 3 } }, // 3초 이후의 첫요청까진 데이터 패칭됨. 3초이후+3초이후의첫요청 => 패칭된 데이터는 stale 상태가 되어 신규 요청함.
    // { next: { tags: ["a"] } }, // 상시 패칭, 요청시마다 초기화
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다... index/.page.tsx fn:RecoBooks</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다.</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다.</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
