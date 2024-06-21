import redHeart from '../../../../assets/icons/red_hearts.png';
import heartOutline from '../../../../assets/icons/heart_outline.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAuth from '../../../../hooks/useAuth';

const SinglePackage = ({ spot, refetch }) => {
    const { _id, spot_image, tour_type, trip_title, price, wishlist, wish_email = [] } = spot;
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const wishlistChange = id => {
        const isAlreadyInWishlist = wish_email.includes(user.email);
        const newWishValue = isAlreadyInWishlist ? 0 : 1;

        axiosPublic.patch(`/wishspots/${id}`, {
            wish: newWishValue,
            wish_email: user.email
        })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    title: 'Success',
                    text: isAlreadyInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={spot_image} alt="Spot" className="rounded-xl w-[310px] h-[200px]" />
                <div className='absolute flex gap-2 text-white px-2 py-1 -ml-60 -mt-36'>
                    <button onClick={() => wishlistChange(_id)}>
                        <img src={wish_email.includes(user?.email) ? redHeart : heartOutline} className='h-6 w-6' alt="" />
                    </button>
                </div>
            </figure >
            <div className="card-body items-center text-center">
                <h2 className="card-title">{trip_title}</h2>
                <p>{tour_type}</p>
                <p>Price: {price}</p>
                <div className="card-actions">
                    <Link to={`/details/${_id}`}><button className="btn btn-primary">View Package</button></Link>
                </div>
            </div>
        </div >
    );
};

export default SinglePackage;
