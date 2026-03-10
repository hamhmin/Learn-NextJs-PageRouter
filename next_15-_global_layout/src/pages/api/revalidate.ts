import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidtion Failed");
  }
}

// 이렇게하고 해당 api 호출하면 ssg페이지 재생성하기때문에 on-demend isr 로 적용 가능.
// getStaticProps에 revalidate 를 적용하면 시간마다 재생성도 가능함. 시간마다 + api 호출시마다 ssg 재생성가능
