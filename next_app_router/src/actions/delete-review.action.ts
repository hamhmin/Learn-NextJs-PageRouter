"use server";
import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

// 서버에서만 실행됨.
export async function deleteReviewAction(state: any, formData: FormData) {
  const id = formData.get("id")?.toString();
  const bookId = formData.get("bookId")?.toString();
  if (!id || !bookId) {
    return {
      status: false,
      error: "reviewid or bookId가 없습니다",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${id}`,
      { method: "DELETE" },
    );
    // console.log(response.status);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return { status: false, error: `리뷰 삭제에 실패했습니다 : ${err}` };
  }
}
