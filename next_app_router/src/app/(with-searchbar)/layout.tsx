import { ReactNode } from "react";
import Searchbar from "../../components/searchbar";
import { Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 클라이언트 라우터 캐시는  공통된 레이아웃을 브라우저에서 보관함. 그래서 새로고침하면 새로 가져오지만 next앱에서 화면이동시엔 보관한곳에서 그대로 가져다씀.   */}
      <div>{new Date().toLocaleString()}</div>

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
