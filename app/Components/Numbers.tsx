"use client";

import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import useSkeleton from "./useSkeleton";
import Skeleton from "./ui/Skeleton";

export default function Numbers() {
  const skeleton = useSkeleton(120);
  if (skeleton)
    return (
      <section id="numbers">
        <div className="container">
          <div className="row">
            <Skeleton className="h-8 w-56 mb-6" />
            <div className="numbers__wrapper grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map((n) => (
                <div key={n} className="p-4">
                  <Skeleton className="h-12 w-12 rounded-full mb-3" />
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <>
      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title">
              Start growing with Summarist now
            </div>
            <div className="numbers__wrapper">
              <div className="numbers">
                <div className="numbers__icon">
                  <BiCrown />
                </div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">
                  Downloads on all platforms
                </div>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className="numbers">
                <div className="numbers__icon">
                  <RiLeafLine />
                </div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
