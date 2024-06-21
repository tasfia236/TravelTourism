
import { useLoaderData } from 'react-router-dom';
import Gallery from './Gallery/Gallery';
import Plan from './Gallery/Plan/Plan';
import Booking from './Booking/Booking';
import AllGuides from './AllGuides/AllGuides';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const Detalis = () => {

    const spot = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { images, spot_name, tour_type, trip_title, price, wishlist, description, tour_plan } = spot;
    console.log(spot);

    const { data: guides = [] } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/guides/tourGuide`);
            return res.data;
        }
    })
    console.log(guides);

    return (
        <div className='pb-12 package-details'>
            <h1 className=' pt-20'>{trip_title}</h1>
            <p className="tour-type">{tour_type}</p>
            <p className="price">${price}</p>

            <h1 className="font-black text-sky-600 text-4xl text-center pb-12">Gallery</h1>
            <Gallery images={images}></Gallery>

            <div className="description">
                <h1 className="font-black text-sky-600 text-4xl text-center pt-12 pb-10">About the Trip</h1>
                <p>{description}</p>
            </div>

            <h1 className="font-black text-sky-600 text-4xl text-center pt-12">Tour Plan</h1>
            <Plan tour_plan={tour_plan}></Plan>

            <h1 className="font-black text-sky-600 text-4xl text-center pt-12">Tour Guide's List</h1>
            <AllGuides guides={guides}></AllGuides>

            <h1 className="font-black text-sky-600 text-4xl text-center pt-12">Booking Form</h1>
            <Booking guides={guides} user={user} spot={spot}></Booking>
        </div>
    );
};

export default Detalis;