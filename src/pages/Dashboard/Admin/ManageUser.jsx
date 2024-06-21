
import Swal from 'sweetalert2';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: requests = [] } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/request-guide');
            return res.data;
        }
    });

    //  console.log(users);
    //  console.log(requests);

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetchUsers();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    const handleMakeTourGuide = (user) => {
        console.log('handleMakeTourGuide called for user:', user);

        axiosSecure.patch(`/users/guide/${user._id}`)
            .then((res) => {
                console.log('Response from server:', res.data);
                if (res.data.modifiedCount > 0) {
                    refetchUsers();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is a Tour Guide Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (res.data.message) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: res.data.message,
                        showConfirmButton: true
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating user role:', error);
            });
    };


    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetchUsers();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success'
                        });
                    }
                });
            }
        });
    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Manage Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Role</th>
                            <th>Tour Guide Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-sm bg-blue-500"
                                        >
                                            <FaUsers className="text-white text-2xl" />
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {user.role === 'tourGuide' ? 'Tour Guide' : (
                                        requests.some((request) => request.email === user.email) ? (
                                            <button
                                                onClick={() => handleMakeTourGuide(user)}
                                                className="btn btn-sm bg-blue-500"
                                            >
                                                <FaUsers className="text-white text-2xl" />
                                            </button>
                                        ) : 'Not Requested'
                                    )}
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
