


import BooksSection from "./BookSection";


export default async function Recommended() {
 
  return (
     <BooksSection
  title="Recommended For You"
  subTitle="We think you'll like these"
  apiUrl="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
/>

  );
}
