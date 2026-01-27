

import BooksSection from "./BookSection";



export default async function Suggested() {


  return (
      <BooksSection
  title="Suggested Books"
  subTitle="Browse those books"
  apiUrl="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
/>
  );
}
