"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <input type="text" hidden name="id" value={reviewId} readOnly />
      <input type="text" hidden name="bookId" value={bookId} readOnly />
      <button type="submit" disabled={isPending}>
        삭제하기
      </button>
    </form>
  );
}
