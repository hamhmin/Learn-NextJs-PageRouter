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
import Head from "next/head";

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
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
      <div>
        {books.map((book) => {
          return <BookItem key={book.id} {...book} />;
        })}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
