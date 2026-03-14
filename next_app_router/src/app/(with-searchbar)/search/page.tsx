import BookItem from "@/components/book-item";
import { BookData } from "@/types";
// export const dynamic = "force-static";
// dynamic 페이지를 static으로 만들면 ssg로 되기때문에 fetch 값이 undefined가 됨. 제대로 작동 안할 수 있음.

// export const dynamic = "error";
// 4. error : 페이지를 강제로 Static 페이지 설정 (설정하면 안되는 이유를 -> 빌드시 오류 발생시킴)

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다... search/page.tsx</div>;
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
