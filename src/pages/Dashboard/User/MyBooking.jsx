
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { TbZoomMoney } from 'react-icons/tb';

const MyBooking = () => {

    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
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
                            <th>Pay</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.package_name}</td>
                                <td>{user.guide_name}</td>
                                <td>{user.date}</td>
                                <td>${user.price}</td>
                                <td>
                                    {user.accept === 'yes' ? 'Accepted' : <button
                                        onClick={() => handleAccept(user)}
                                        className="btn btn-sm bg-blue-500">
                                        <FaCheck className="text-white 
                                        text-2xl"></FaCheck>
                                    </button>}
                                </td>
                                <td>
                                    {user.accept === 'yes' && <button
                                        className='btn btn-sm bg-green-400'>
                                        <TbZoomMoney className="text-white 
                                        text-2xl"></TbZoomMoney>
                                    </button>
                                    }
                                </td>
                                <td>
                                    {user.accept === 'reject' ? 'Rejected' : <button
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
        </div>
    );
};

export default MyBooking;