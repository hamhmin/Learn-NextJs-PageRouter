"use client";
import style from "./review-editor.module.css";

import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export function ReviewEditor({ bookId }: { bookId: string }) {
  //useActionState는 클라이언트 컴포넌트에서 서버 액션의 진행 파악, 에러핸들링을 할 수 있게해줌.

  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );
  /*
  아래에서 return하는게 state에 들어감.
  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과ㅏ 작성자를 입력해주세요.",
    };
  }
*/
  /*
useActionState를 사용하면 createReviewAction의 매개변수를 앞쪽에 state를 받아야줘야함.
export async function createReviewAction(state: any, formData: FormData) {

*/

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "로딩 중" : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
