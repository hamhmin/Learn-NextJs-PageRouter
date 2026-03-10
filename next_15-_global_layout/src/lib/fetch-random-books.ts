import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const baseURL =
    process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:12345";

  const url = `${baseURL}/book/random`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
