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
      slidesPerView={5}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      speed={1000}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={amazon} alt="amazon" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={amd} alt="amd" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={apple} alt="apple" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={flipkart} alt="flipkart" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={ibm} alt="ibm" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={meta} alt="meta" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={microsoft} alt="microsoft" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={nvidia} alt="nvidia" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={qualcomm} alt="qualcomm" className="w-32 h-12" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <img src={uber} alt="uber" className="w-32 h-12" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default CompanySwiper;
