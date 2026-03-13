import Searchbar from "../../components/searchbar";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Searchbar></Searchbar>
      <div>임시 서치바</div>
      {children}
    </div>
  );
}
