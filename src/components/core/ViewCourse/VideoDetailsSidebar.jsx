import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import IconBtn from "../../common/IconBtn";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  // console.log("HII", setReviewModal);
  const { courseId, sectionId, subSectionId } = useParams();
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActive, setVideoActive] = useState("");

  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    (async () => {
      if (!courseSectionData?.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData[
        currentSectionIndex
      ]?.subsection?.findIndex(
        (subSection) => subSection?._id === subSectionId
      );
      if (currentSectionIndex === -1 || currentSubSectionIndex === -1) return;
      const activesubsectionId =
        courseSectionData[currentSectionIndex]?.subsection[
          currentSubSectionIndex
        ]?._id;
      // console.log("Active Subsection ID:", activesubsectionId);
      // console.log("Current Section Index:", courseSectionData[currentSectionIndex]?._id);
      // set current section here
      setActiveStatus(courseSectionData[currentSectionIndex]?._id);
      // set current sub-section here
      setVideoActive(activesubsectionId);
    })();
  }, [
    courseSectionData,
    courseEntireData,
    sectionId,
    subSectionId,
    location.pathname,
  ]);

  return (
    <>
      <div
        // for buttons and heading
        className={`${
          showSidebar ? "" : "hidden"
        } w-6 h-72 md:hidden absolute center`}
      >
        <FaChevronRight
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className={` md:hidden z-10 cursor-pointer text-2xl text-richblack-900 m-2 bg-richblack-100 rounded-full p-1 top-3 absolute left-0`}
        />
      </div>
      <div
        className={`${
          showSidebar ? "h-0 w-0" : "h-[calc(100vh-3.5rem)] w-[320px]"
        } transition-all duration-700 z-20 relative offSidebar1`}
      >
        <div
          className={`${
            showSidebar ? "hidden" : ""
          } transition-all origin-right duration-500 flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 offSidebar2`}
        >
          <div
            className={`${
              showSidebar ? "hidden" : ""
            } mx-5   flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25 offSidebar2`}
          >
            <div className="flex w-full items-center justify-between ">
              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90">
                <FaChevronLeft
                  className="cursor-pointer md:hidden"
                  onClick={() => {
                    setShowSidebar(true);
                  }}
                />
                <FaChevronLeft
                  className="cursor-pointer hidden md:block"
                  onClick={() => {
                    navigate(`/dashboard/enrolled-courses`);
                  }}
                />
              </div>
              <div>
                <IconBtn
                  text={"Review"}
                  onClickHandler={() => setReviewModal(true)}
                />
              </div>
            </div>

            {/* //heading and title */}
            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} of {totalNoOfLectures} Lectures
                Completed
              </p>
            </div>
          </div>

          {/* //course section data */}
          <div className="h-[calc(100vh - 5rem)] overflow-y-auto px-2">
            {courseSectionData?.map((section, index) => (
              <details
                key={index}
                open={activeStatus === section?._id}
                className="appearance-none text-richblack-5 detailanimatation"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveStatus(section?._id);
                  }}
                  className="mt-2 cursor-pointer text-sm text-richblack-5 appearance-none"
                >
                  <div className="flex flex-row justify-between bg-richblack-600 items-center px-5 py-3">
                    <p className="w-[70%] font-semibold">
                      {section?.sectionName}
                    </p>
                    <div className="">
                      {activeStatus === section?._id ? (
                        <MdOutlineKeyboardArrowUp className="arrow" />
                      ) : (
                        <MdOutlineKeyboardArrowDown className="arrow" />
                      )}
                    </div>
                  </div>
                </summary>
                <div>
                  {activeStatus === section?._id && (
                    <div>
                      {section?.subsection.map((subSection) => (
                        <div
                          key={subSection?._id}
                          className="transition-[height] duration-500 ease-in-out"
                        >
                          <div
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                setShowSidebar(true);
                              }
                              navigate(
                                `/view-course/${courseId}/section/${section?._id}/sub-section/${subSection?._id}`
                              );
                              setVideoActive(subSection?._id);
                            }}
                            className={`${
                              videoActive === subSection?._id
                                ? "bg-yellow-200 text-richblack-900"
                                : "bg-richblack-900 text-white"
                            } cursor-pointer items-center flex gap-3 px-5 py-2 font-semibold text-richblack-800 border-b-[1px] border-richblack-600 `}
                          >
                            <div className="flex">
                              <input
                                readOnly={true}
                                checked={completedLectures?.includes(
                                  subSection?._id
                                )}
                                type="checkbox"
                                className="w-4 h-4 rounded-full border-2 border-pink-200 bg-transparent 
                                            checked:bg-caribbeangreen-200 checked:border-caribbeangreen-200 
                                            appearance-none cursor-pointer transition-all duration-200 
                                            relative checked:after:content-['✔'] checked:after:absolute 
                                            checked:after:inset-0 checked:after:flex checked:after:items-center 
                                            checked:after:justify-center checked:after:text-[11px] 
                                            checked:after:text-black checked:after:font-bold checked:after:-mb-[0.08rem]"
                              />
                              {/* <label className="check-box"></label> */}
                            </div>
                            <p>{subSection?.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
