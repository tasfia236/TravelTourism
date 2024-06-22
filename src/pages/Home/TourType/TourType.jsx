
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
import { Link } from 'react-router-dom';

const TourType = () => {
    return (
        <div className='mx-auto m-5 text-center'>
            <h1 className="font-black text-sky-600 text-2xl lg:text-4xl py-10"> Tour Type </h1>
            <Swiper
                slidesPerView={3}
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
                    <Link to='/tourtype/sports'><img src={sports} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>WildLife</h1>
                    <Link to='/tourtype/wildlife'><img src={wildlife} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Hiking</h1>
                    <Link to='/tourtype/hiking'><img src={hiking} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Walking</h1>
                    <Link to='/tourtype/walking'><img src={walking} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Air Rides</h1>
                    <Link to='/tourtype/air'><img src={air} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Desert</h1>
                    <Link to='/tourtype/desert'><img src={desert} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='absolute'>Historical</h1>
                    <Link to='/tourtype/historical'><img src={historical} alt="" /></Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default TourType;