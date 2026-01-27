import Image from "next/image";

export default function PlanHeader() {
  return (
    <div className="
        relative z-0 w-full text-center pt-12 mb-6
        min-h-[400px] lg:min-h-[520px]
        before:content-['']
        before:absolute
        before:inset-0
    before:bg-[#032b41]
    before:rounded-b-[10rem] lg:before:rounded-b-[16rem]
    before:z-[-1]
      ">
      <div className="max-w-[1000px] mx-auto text-white px-6">
        <div className="text-3xl md:text-5xl font-bold mb-10">
          Get unlimited access to many amazing books to read
        </div>
        <div className="text-lg md:text-xl mb-8">
          Turn ordinary moments into amazing learning opportunities
        </div>
        <figure
          className="flex justify-center max-w-[340px] mx-auto rounded-t-[180px] overflow-hidden relative h-[220px] translate-y-14"
        >
         <Image
    src="/pricing-top.png"
    alt=""
    width={1000}      
    height={220}
    className="w-full h-full object-cover"
  />

        </figure>
      </div>
    </div>
  );
}
