"use client";
import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (!dialogRef.current?.open) {
      // 모달이 마운트되면 닫혀있을것임. 항상 열리도록 설정해주기.
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);
  // Modal 컴포넌트를 호출하면 #modal-root에 생성될것임.
  return createPortal(
    <dialog
      onClick={(e) => {
        // 모달의 배경이 클릭이 된다면 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          // 타입오류가 나는건 dialog에 onclick이벤트가 발생했을때 nodeName 속성을 지원하지않아서 그렇기때문에 any으로 단언해줌.
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
