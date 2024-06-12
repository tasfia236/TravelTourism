
import redHeart from '../../../../assets/icons/red_hearts.png';
import heartOutline from '../../../../assets/icons/heart_outline.png';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useState } from 'react';

const SinglePackage = ({ spot }) => {
    const { spot_image, tour_type, trip_title, price, wishlist } = spot;

    const axiosPublic = useAxiosPublic();
    const [added, setAdded] = useState([]);

    const wishlistChange = id => {
        axiosPublic.patch(`/spots/${id}`, {
            body: { wishlist: 0 }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully Added Wishlist ',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    // update state
                    const remaining = added.filter(added => added._id !== id);
                    const updated = added.find(added => added._id === id);
                    updated.status = 0
                    const wishSpots = [updated, ...remaining];
                    setAdded(wishSpots);
                }
            })
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={spot_image} alt="Shoes" className="rounded-xl w-[310px] h-[200px]" />
                <div className='absolute flex gap-2 text-white px-2 py-1 -ml-56 -mt-40'>
                    <button onClick={wishlistChange}><img src={heartOutline} className='h-6 w-6' alt="" /></button>
                    <button onClick={wishlistChange}><img src={redHeart} className='h-6 w-6' alt="" /></button>
                </div>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{trip_title}</h2>
                <p>{tour_type}</p>
                <p>Price: {price}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">View Package</button>
                </div>
            </div>
        </div>
    );
};

export default SinglePackage;