import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const MyWishlist = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = () => {
        const response = axiosPublic.get(`/wishlist/${user.email}`);
        setWishlistItems(response.data);

    };

    const handleDelete = id => {
        const response = axiosPublic.delete(`/wishlist/${id}`);
        if (response.data.deletedCount > 0) {
            Swal.fire({
                title: 'Deleted!',
                text: 'Your wishlist item has been deleted.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            fetchWishlist();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete wishlist item.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4 text-center py-5">My Wishlist</h1>
            <table className="table table-zebra w-full">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">Trip Title</th>
                        <th className="py-3 px-6 text-left">Tour Type</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {wishlistItems.map(item => (
                        <tr key={item._id}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{item.trip_title}</td>
                            <td className="py-3 px-6 text-left">{item.tour_type}</td>
                            <td className="py-3 px-6 text-left">{item.price}</td>
                            <td className="py-3 px-6 text-left">
                                <button onClick={() => handleDelete(item._id)} className="mr-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none">Delete</button>
                                <Link to={`/details/${item._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded focus:outline-none">Visit Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyWishlist;
