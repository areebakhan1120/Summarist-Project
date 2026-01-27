import Recommended from "./Recommended";
import Selected from "./Selected";
import Suggested from "./Suggested";


async function getData() {


  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
  );
  return res.json();
}

export default async function ForYou() {
  const books = await getData();

  return (
    
    <div className="relative flex flex-col transition-all duration-300 w-full">
      <Selected books={books} />
      <Recommended />
      <Suggested />
    </div>
  );
}
