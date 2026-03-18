"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

//서버, 클라이언트 모두 에러를 대응하기위해서 use client를 씀.
// 현재 폴더 위치부터 최하단의 위치까지  에러 발생 컴포넌트는 이 error.tsx 컴포넌트로 대체됨.

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div>
      <h3>검색과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          //   reset() // reset()은 클라이언트에서 컴포넌트 렌더링을 다시해주는거라 서버에서 fetch를 다시해주는건 아님. 그래서 이 방법으론 원하는 동작하지않음.
          //   window.location.reload() // 새로고침은 state나 다른 사용자 동작이 기억되지않음.
          startTransition(() => {
            //router.refresh는 비동기로 작동하게되는데, async await을 사용하지못한다. 그래서 reset()을 실행시킬 시점을 알려줄 수 없는데 이때 react18의 startTransition을 사용하면 렌더링해주는 함수들을 동시에 실행되게해준다.
            router.refresh(); // 현재 페에지에 필요한 서버컴포넌트들을 다시불러옴.
            reset(); // 에러상태를 초기화, 클라이언트에 보일 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시시도
      </button>
    </div>
  );
}
