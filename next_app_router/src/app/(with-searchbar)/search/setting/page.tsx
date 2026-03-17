import { delay } from "@/util/delay";

export default async function Page() {
  await delay(2000);
  return <div>setting page</div>;
}
