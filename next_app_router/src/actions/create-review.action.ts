"use server";
import { revalidatePath } from "next/cache";

// 서버에서만 실행됨.
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  // const author: FormDataEntryValue | null 라서 ?.toString() 으로 string|undefined로 추론하게 만든다.
  if (!bookId || !content || !author) {
    return;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ bookId, content, author }) },
    );
    // console.log(response.status);

    revalidatePath(`/book/${bookId}`);
    // 이 페이지를 재검증함. 서버에서만 호출 가능. 캐시도 무효화시켜버림. 풀라우트캐시까지.
    // revalidatePath로 재검증중에 데이터캐시는 저장되고 풀라우트 캐시는 저장되지않고, 새로고침해서 book/[id] 페이지 접속시 풀라우트캐시에 다시 저장됨.
  } catch (err) {
    console.error(err);
    return;
  }
}
