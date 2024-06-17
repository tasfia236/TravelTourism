
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../assets/banner.css';

// import required modules
import { Scrollbar } from 'swiper/modules';

import  img1 from '../assets/banner/img1.jpg';
import  img2 from '../assets/banner/img2.jpg';

const Banner = () => {
    return (
        <>
        <Swiper
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img2} alt="" /></SwiperSlide>
        </Swiper>
      </>
    );
};

export default Banner;