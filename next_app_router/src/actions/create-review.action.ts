"use server";
import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

// 서버에서만 실행됨.
export async function createReviewAction(state: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  // const author: FormDataEntryValue | null 라서 ?.toString() 으로 string|undefined로 추론하게 만든다.
  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과ㅏ 작성자를 입력해주세요.",
    };
  }
  try {
    // await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ bookId, content, author }) },
    );
    // console.log(response.status);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);
    // 이 페이지를 재검증함. 서버에서만 호출 가능. 캐시도 무효화시켜버림. 풀라우트캐시까지.
    // revalidatePath로 재검증중에 데이터캐시는 저장되고 풀라우트 캐시는 저장되지않고, 새로고침해서 book/[id] 페이지 접속시 풀라우트캐시에 다시 저장됨.

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath(`/book/[id]`, "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // 4. 모든 데이터 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return { status: false, error: `리뷰 저장에 실패했습니다 : ${err}` };
  }
}
