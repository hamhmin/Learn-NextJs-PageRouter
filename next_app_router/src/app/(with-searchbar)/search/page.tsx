import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import Loading from "./loading";
import { delay } from "@/util/delay";
import { Suspense } from "react";
// export const dynamic = "force-static";
// dynamic 페이지를 static으로 만들면 ssg로 되기때문에 fetch 값이 undefined가 됨. 제대로 작동 안할 수 있음.

// export const dynamic = "error";
// 4. error : 페이지를 강제로 Static 페이지 설정 (설정하면 안되는 이유를 -> 빌드시 오류 발생시킴)

async function SearchResult({ q }: { q: string }) {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    return <Loading />;
  }
  const searchBooks: BookData[] = await response.json();

  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  // Suspence : 미완성
  // fallback : 대체제
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>Loading ...</div>}>
      <SearchResult q={searchParams.q || ""} />;
    </Suspense>
  );
}
