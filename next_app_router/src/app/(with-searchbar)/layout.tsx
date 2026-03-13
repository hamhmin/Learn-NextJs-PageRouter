import { ReactNode } from "react";
import Searchbar from "../../components/searchbar";
import { Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Suspense를 사용하면 빌드타임에서 발생하는 
      static 생성시 쿼리스트링을 가져오는 함수를 썼을때의 오류를
       "미완성" 상태로 만들어 서버에서 사전렌더링을 하지 않게 해준다.
       */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
