
const Booking = () => {
    return (
        <div className="p-12 min-h-screen bg-base-200">
            <div className="">
                <div className="card shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="image" className="block mb-2">Tourist Name</label>
                                <input disabled type="text" id="image" name="image" className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div>
                                <label htmlFor="food_name" className="block mb-2">Tourist Email</label>
                                <input disabled type="text" id="food_name" name="food_name" className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div>
                                <label htmlFor="food_quantity" className="block mb-2">Tourist Image URL</label>
                                <input disabled type="text" id="food_quantity" name="food_quantity" className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-2">Tour Guide Name:</label>
                                <select id="status" name="status" className="w-full px-3 py-2 border rounded-md">
                                    <option value="0">Available</option>
                                    <option value="1">Not Available</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="location" className="block mb-2">Price</label>
                                <input type="text" id="location" name="location"  className="w-full px-3 py-2 border rounded-md" required />
                            </div>

                            <div>
                                <label htmlFor="expired" className="block mb-2">Date:</label>
                                <input type="text" id="expired" name="expired" className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Book Now!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;