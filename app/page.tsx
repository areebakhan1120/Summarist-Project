
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";
import Features from "./Components/Features";
import Reviews from "./Components/Reviews";
import Numbers from "./Components/Numbers";
import Footer from "./Components/Footer";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading delay




  return (
    <>
      <Navbar />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
    </>
  );
}
