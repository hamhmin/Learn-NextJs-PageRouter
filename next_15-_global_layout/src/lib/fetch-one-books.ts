import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number,
): Promise<BookData | null> {
  const baseURL =
    process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:12345";
  const url = `${baseURL}/book/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
