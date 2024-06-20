
const AllGuides = ({guides}) => {

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            guides.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img className="btn-circle" src={user.image} alt="" />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllGuides;