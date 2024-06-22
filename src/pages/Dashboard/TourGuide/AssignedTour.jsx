
import { useQuery } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";


const AssignedTour = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of bookings to display per page


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned?email=${user.email}`);
            return res.data;
        }
    })
    console.log(users);

    const handleAccept = user => {
        axiosSecure.patch(`/users/bookingAccept/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.tourist_name} is Accepted!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleReject = user => {
        axiosSecure.patch(`/users/bookingReject/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.tourist_name} is Rejected!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>
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
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Assigned Tours: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Package's Name</th>
                            <th>Tourist Name</th>
                            <th>Tour Date</th>
                            <th>Tour Price</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentBookings.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.package_name}</td>
                                <td>{user.tourist_name}</td>
                                <td>{user.date}</td>
                                <td>${user.price}</td>
                                <td>
                                    {user.status === 'Accepted' ? 'Accepted' : <button
                                        onClick={() => handleAccept(user)}
                                        className="btn btn-sm bg-blue-500">
                                        <FaCheck className="text-white 
                                        text-2xl"></FaCheck>
                                    </button>}
                                </td>
                                <td>
                                    {user.status === 'Rejected' ? 'Rejected' : <button
                                        onClick={() => handleReject(user)}
                                        className="btn btn-sm bg-red-500">
                                        <RxCross2 className="text-white 
                                        text-2xl"></RxCross2>
                                    </button>}
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
        </div>
    );
};

export default AssignedTour;