import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const MyWishlist = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of bookings to display per page

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await axiosPublic.get(`/wishlist/${user.email}`);
            setWishlistItems(response.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch wishlist items. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    const handleDelete = id => {
        const response = axiosPublic.delete(`/wish/${id}`);
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

        // Calculate pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentWishLists = wishlistItems.slice(startIndex, endIndex);

        const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);
    
        const getPageNumbers = () => {
            const pageNumbers = [];
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
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
                    {currentWishLists?.map(item => (
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
            {/* Pagination controls */}
            <div className="pagination">
                {getPageNumbers().map((number) => (
                    <button
                        key={number}
                        className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>
                ))}

            </div>
        </div>
    );
};

export default MyWishlist;
