import { useRouter } from "next/router";

export default function Page() {
  // [id] 는 url에 상위 폴더 명/id 로 라우팅,
  // [...id]는 상위 폴더 명/id/id/... 모든 id에 대응하겠다는 의미 = catch all segment
  // [[...id]]는 id가 없어도 페이지로 인식됨, index.tsx 안만들고싶을때 사용, = optional catch all segment
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  console.log(id);
  return <h1>Book {id}</h1>;
}
