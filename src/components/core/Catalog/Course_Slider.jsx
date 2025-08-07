import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          loop={true}
          spaceBetween={25}
          slidesPerView={1}
          autoplay={{
            delay: 1000, // Adjust as needed
            disableOnInteraction: false, // ⬅️ Keeps autoplay even after swipe
            stopOnLastSlide: false, // ⬅️ Continues autoplay even on the last slide
            pauseOnMouseEnter: false, // ⬅️ Autoplay continues even when mouse hovers over the slider
          }}
          modules={[Autoplay, FreeMode]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          grabCursor={true} // ⬅️ Shows "grab" cursor on desktop
          className="!min-h-[250px]"
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider
