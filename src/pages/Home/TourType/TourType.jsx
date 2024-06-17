
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import '../../../assets/tourtype.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

import sports from '../../../assets/tpes/sports.jpeg';
import desert from '../../../assets/tpes/Desert.jpeg';
import walking from '../../../assets/tpes/walkinng.jpeg';
import hiking from '../../../assets/tpes/hiking.jpeg';
import air from '../../../assets/tpes/air rides.jpeg';
import historical from '../../../assets/tpes/historical.jpeg';
import wildlife from '../../../assets/tpes/wildlife.jpeg';

const TourType = () => {
    return (
        <div className='mx-auto m-5 text-center'>
            <h1 className="font-black text-sky-600 text-4xl py-10"> Tour Type </h1>
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                <h1 className='absolute'>Sports</h1>
                    <img src={sports} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>WildLife</h1>
                    <img src={wildlife} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Hiking</h1>
                    <img src={hiking} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Walking</h1>
                    <img src={walking} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Air Rides</h1>
                    <img src={air} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Desert</h1>
                    <img src={desert} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Historical</h1>
                    <img src={historical} alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default TourType;