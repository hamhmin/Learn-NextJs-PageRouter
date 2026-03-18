import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import { ReviewEditor } from "@/components/review-editor";
export const dynamicParams = false; // 설정시 모든 접속에서 원치않는 static 페이지가 생성되는 현상을 막아줌.

// ssg의 getStaticProps fallback:blocking, getStaticPaths 설정하는거랑 같음.
// 하지만 풀라우터캐시에 저장되기때문에 generateStaticParams로 return한 id를 포함한 페이지와 첫 접속 이후 생성된 페이지들은 데이터 패칭을 하는게 아니라 풀라우터캐시에서 가져오기때문에 그 (데이터패칭을 포함한 사전렌더링단계)다음단계를 가지않아서 데이터패칭을 할 필요가 없어지기 때문에 데이터패칭을 안하는거임.

// 이때 "fetch 옵션에 "force-cache"를 설정하지 않았음에도 어떻게 이럴 수 있느냐"고 질문 주셨는데요
// 동적 경로를 갖는 페이지에 한해 예외적으로! generateStaticParams 함수가 존재한다면, 무조건 Static 페이지로 설정하게 됩니다.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound(); //  없는 페이지. 404일때 notFound()
    }
    return <div>오류가 발생했습니다... book/page.tsx</div>;
  }
  const bookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } =
    bookData;
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { method: "GET" },
  );
  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
