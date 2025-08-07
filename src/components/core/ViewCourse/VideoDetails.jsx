import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "video-react/dist/video-react.css";

import {
  BigPlayButton,
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  LoadingSpinner,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
} from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { MdOutlineReplayCircleFilled } from "react-icons/md";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionData?.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        const filteredVideoData = filteredData?.[0]?.subsection.find(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData || null);
        setPreviewSource(courseEntireData?.thumbnail || "");
        setVideoEnded(false);
      }
    })();
  }, [
    courseSectionData,
    courseEntireData,
    location.pathname,
    courseId,
    sectionId,
    subSectionId,
  ]);

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subsection.findIndex((data) => data._id === subSectionId);

    return currentSectionIndx === 0 && currentSubSectionIndx === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subsection?.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subsection.findIndex((data) => data._id === subSectionId);

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    );
  };

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subsection.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subsection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subsection[
          currentSubSectionIndx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1]?.subsection[0]?._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subsection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx]?.subsection[
          currentSubSectionIndx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1]?.subsection?.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1]?.subsection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="md:w-[calc(100vw-350px)] w-screen p-3">
      {!videoData && !previewSource ? (
        <h1 className="text-2xl font-bold text-richblack-25">No Data Found</h1>
      ) : (
        <div className="border-2 border-white poster-fit aspect-video w-full relative bg-black">
          {videoData?.videoUrl ? (
            <Player
              className="w-full h-full"
              ref={playerRef}
              src={videoData.videoUrl}
              aspectRatio="16:9"
              poster={previewSource}
              fluid={true}
              autoPlay={false}
              onEnded={() => setVideoEnded(true)}
            >
              <BigPlayButton position="center" />
              <LoadingSpinner />
              <ControlBar>
                <PlaybackRateMenuButton
                  rates={[5, 2, 1, 0.5, 0.1]}
                  order={7.1}
                />
                <ReplayControl seconds={5} order={7.1} />
                <ForwardControl seconds={5} order={7.2} />
                <TimeDivider order={4.2} />
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
              </ControlBar>

              {videoEnded && (
                <div className="flex justify-center items-center">
                  {!completedLectures.includes(videoData._id) && (
                    <IconBtn
                      disabled={loading}
                      onClickHandler={handleLectureCompletion}
                      text={!loading ? "Mark as Completed" : "Loading..."}
                      customClasses="text-xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 transition-all duration-200 -translate-x-[6.5rem] absolute top-2/3 z-20"
                    />
                  )}

                  {!isFirstVideo() && (
                    <BiSkipPreviousCircle
                      onClick={goToPrevVideo}
                      className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer transition-all duration-200 hover:scale-90 left-3 absolute top-1/2 z-20"
                    />
                  )}
                  {!isLastVideo() && (
                    <BiSkipNextCircle
                      onClick={goToNextVideo}
                      className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer transition-all duration-200 hover:scale-90 right-3 absolute top-1/2 z-20"
                    />
                  )}

                  <MdOutlineReplayCircleFilled
                    onClick={() => {
                      playerRef.current.seek(0);
                      playerRef.current.play();
                      setVideoEnded(false);
                    }}
                    className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer transition-all duration-200 hover:scale-90 absolute top-1/2 z-20"
                  />
                </div>
              )}
            </Player>
          ) : (
            <img
              src={previewSource}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* video title and desc */}
      {videoData && (
        <div className="mt-3 flex flex-row bg-yellow-200 py-1 px-3 gap-3 items-center">
          <h1 className="text-2xl font-bold text-richblack-900">
            {videoData?.title}:
          </h1>
          <p className="text-gray-500 font-semibold text-xl text-richblack-900">
            {videoData?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
