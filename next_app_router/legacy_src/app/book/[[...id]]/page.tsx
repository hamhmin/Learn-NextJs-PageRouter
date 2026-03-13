export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      book/{id} [...id] page입니다. 이곳은 /book, /book/1, /book/1/2 모두 접근
      가능합니다. 폴더명에 []를 한번 더 감싸 [[...id]]를 해줬기때문에 /book도
      가능한겁니다.
    </div>
  );
}
