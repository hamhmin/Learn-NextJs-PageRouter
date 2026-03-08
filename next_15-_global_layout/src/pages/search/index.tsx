import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
// import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";

// export const getStaticProps = async () => {};

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const route = useRouter();
  const q = route.query.q;

  const fetchSearchResult = async () => {
    const book = await fetchBooks(q as string);
    setBooks(book);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => {
        return <BookItem key={book.id} {...book} />;
      })}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
