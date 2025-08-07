import React, { useState } from "react";
import HomePageExplore from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import ExploreMoreCard from "./ExploreMoreCard";

const ExploreMore = () => {
  const [idx, setIdx] = useState(0);
  return (
    <div>
      <div className="w-11/12 flex flex-col gap-10 items-center mb-2">
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl font-semibold">
            Unlock the <HighlightText text={"Power of Code"} />
          </div>
          <p className="text-richblack-300 font-bold text-justify">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
        <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
          {HomePageExplore.map((ele, index) => {
            return (
              <div
                className={` text-[16px] flex flex-row items-center gap-2 ${
                  index === idx
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                key={index}
                onClick={() => setIdx(index)}
              >
                {ele.tag}
              </div>
            );
          })}
        </div>
        <div className="hidden lg:block lg:h-[200px]"></div>

        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
          {HomePageExplore[idx].courses.map((course, index) => (
            <ExploreMoreCard
              key={index}
              index={index}
              heading={course.heading}
              description={course.description}
              lessonNumber={course.lessonNumber}
              level={course.level}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
