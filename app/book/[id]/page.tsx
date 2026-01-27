import BookDetails from "../BookDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  const book = await res.json();

  return <BookDetails book={book} />;
}