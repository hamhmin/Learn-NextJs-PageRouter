import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  const baseURL =
    process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:12345";
  let url = `${baseURL}/book`;
  // https://onebite-books-server-main-gold-seven.vercel.app/
  if (q) {
    url += `/search?q=${q}`;
  }
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
