
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery} from '@tanstack/react-query';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { TbZoomMoney } from 'react-icons/tb';
import { useState } from 'react';

const MyBooking = () => {

    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of bookings to display per page


    console.log(user.email)
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mybooking/${user.email}`);
            return res.data;
        }
    })
    console.log(users);

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }

    const handleAccept = () => {

    }

    const handleReject = ()

    const handleCancelBooking = () => {

    }

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBookings = users.slice(startIndex, endIndex);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div>
            <div className="container flex justify-evenly my-4">
                <h2 className="text-3xl font-bold mb-4 text-center py-5">My Booking: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Package's Name</th>
                            <th>Tour Guide Name</th>
                            <th>Tour Date</th>
                            <th>Tour Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentBookings.map((booking, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{booking.package_name}</td>
                                <td>{booking.guide_name}</td>
                                <td>{booking.date}</td>
                                <td>${booking.price}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {booking.status === 'In Review' && (
                                        <button
                                            onClick={() => handleReject(booking.id)}
                                            className="btn btn-sm bg-red-500 mr-2"
                                        >
                                            <RxCross2 className="text-white text-2xl" />
                                        </button>
                                    )}
                                    {booking.status === 'In Review' && (
                                        <button
                                            onClick={() => handleAccept(booking.id)}
                                            className="btn btn-sm bg-blue-500"
                                        >
                                            <FaCheck className="text-white text-2xl" />
                                        </button>
                                    )}
                                    {booking.status === 'Accepted' && (
                                        <button className="btn btn-sm bg-green-400">
                                            <TbZoomMoney className="text-white text-2xl" />
                                        </button>
                                    )}
                                    {booking.status === 'In Review' && (
                                        <button
                                            onClick={() => handleCancelBooking(booking.id)}
                                            className="btn btn-sm bg-red-500"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
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
        </div >
    );
};

export default MyBooking;