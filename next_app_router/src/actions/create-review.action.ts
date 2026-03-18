"use server"; // 서버에서만 실행됨.
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  // const author: FormDataEntryValue | null 라서 ?.toString() 으로 string|undefined로 추론하게 만든다.
  console.log(bookId, content, author);
  if (!bookId || !content || !author) {
    return;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ bookId, content, author }) },
    );
    console.log(response.status);
  } catch (err) {
    console.error(err);
    return;
  }
}
