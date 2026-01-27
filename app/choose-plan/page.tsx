import Footer from "./Footer";
import Landing from "./landing";
import PlanHeader from "./PlanHeader";

export default async function ChoosePlan() {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network latency to show loading state

  return (
    <div className="w-full">
      <PlanHeader />
      <Landing />
      <section id="footer" className="bg-[#f1f6f4]">
        <Footer />
      </section>
    </div>
  );
}
