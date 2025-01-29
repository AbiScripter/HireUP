import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import amazon from "../assets/companies/amazon.svg";
import amd from "../assets/companies/amd.svg";
import apple from "../assets/companies/apple.svg";
import flipkart from "../assets/companies/flipkart.svg";
import ibm from "../assets/companies/ibm.svg";
import meta from "../assets/companies/meta.svg";
import microsoft from "../assets/companies/microsoft.svg";
import nvidia from "../assets/companies/nvidia.svg";
import qualcomm from "../assets/companies/qualcomm.svg";
import uber from "../assets/companies/uber.svg";

const CompanySwiper = () => {
  return (
    <Swiper
      // spaceBetween={10}
      style={{ alignItems: "center" }}
      slidesPerView={2}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      speed={1000}
      modules={[Autoplay, Pagination, Navigation]}
      breakpoints={{
        540: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
    >
      <SwiperSlide>
        <div className="flex justify-center items-center mt-1">
          <img
            src={amazon}
            alt="amazon"
            className="h-12 w-24 xs:w-28 sm:w-32"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={amd} alt="amd" className="h-12 w-24 xs:w-28 sm:w-32" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={apple} alt="apple" className="h-12 w-24 xs:w-28 sm:w-32" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img
            src={flipkart}
            alt="flipkart"
            className="h-12 w-24 xs:w-28 sm:w-32"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={ibm} alt="ibm" className="h-12 w-24 xs:w-28 sm:w-32" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={meta} alt="meta" className="h-12 w-24 xs:w-28 sm:w-32" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img
            src={microsoft}
            alt="microsoft"
            className="h-12 w-24 xs:w-28 sm:w-32"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img
            src={nvidia}
            alt="nvidia"
            className="h-12 w-24 xs:w-28 sm:w-32"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img
            src={qualcomm}
            alt="qualcomm"
            className="h-12 w-24 xs:w-28 sm:w-32"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={uber} alt="uber" className="h-12 w-24 xs:w-28 sm:w-32" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default CompanySwiper;
