import { bookData } from "../../../data.js";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = bookData.find((book) => book.id === id);
  const { title, subTitle } = data;
  return (
    <div>
      book page {id}
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
}
