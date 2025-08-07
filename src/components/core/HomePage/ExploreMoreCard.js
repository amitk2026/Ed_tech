import React from "react";
import { MdPeople } from "react-icons/md";
import { LiaSitemapSolid } from "react-icons/lia";

const ExploreMoreCard = ({ heading, description, level, lessonNumber }) => {
  return (
    // <div className="w-[360px] lg:w-[30%] box-border cursor-pointer border-2 shadow-[15px_15px_0] shadow-yellow-25">
    <div className="h-[300px] bg-white w-[360px] lg:w-[30%] box-border cursor-pointer shadow-[15px_15px_0] shadow-yellow-25">
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div className="text-xl font-medium text-black">{heading}</div>
        <p className="text-richblack-300 text-justify break-normal">
          {description}
        </p>
      </div>
      <div className="flex text-richblue-300 items-center justify-between py-2 px-4 flex-row border-t-2 border-richblack-300 border-dashed">
        <div className="flex flex-row items-center gap-3">
          <MdPeople />
          {level}
        </div>
        <div className="flex flex-row items-center gap-3 ">
          <LiaSitemapSolid />
          {lessonNumber} Lesson
        </div>
      </div>
    </div>
    // {/* </div> */}
  );
};

export default ExploreMoreCard;
