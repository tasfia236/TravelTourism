
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Booking = ({ guides, user, spot }) => {

    
    const [startDate, setStartDate] = useState(new Date());
   // console.log(user);
  //  console.log(spot);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            // Redirect to login if user is not logged in
            navigate('/login');
            return;
        }

        const form = e.target;
        const tourist_name = form.tourist_name.value;
        const tourist_email = form.tourist_email.value;
        const tourist_image = form.tourist_image.value;
        const price = form.price.value;
        const date = form.date.value;
        const guide_data = JSON.parse(form.guide.value);
        const accept = 'no';
        const package_name = spot.trip_title;

        const BookTour = {
            package_name,
            tourist_name,
            tourist_email,
            tourist_image,
            price,
            date,
            guide_name: guide_data.name, // Storing guide's name
            email: guide_data.email, // Storing guide's email
            accept
        };

        axiosPublic.post('/booking', BookTour)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Confirm Your Booking!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
            .catch(error => {
                console.error(error);
            })
    };


    return (
        <div className="p-12 min-h-screen bg-base-200">
            <div className="">
                <div className="card shadow-2xl bg-base-100">
                    <form onSubmit={handleBooking} className="card-body">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="tourist_name" className="block mb-2">Tourist Name</label>
                                <input disabled type="text" id="tourist_name" name="tourist_name" defaultValue={user?.displayName} className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="tourist_email" className="block mb-2">Tourist Email</label>
                                <input disabled type="text" id="tourist_email" name="tourist_email" defaultValue={user?.email} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div>
                                <label htmlFor="tourist_image" className="block mb-2">Tourist Image URL</label>
                                <input disabled type="text" id="tourist_image" name="tourist_image" defaultValue={user?.photoURL} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div>
                                <label htmlFor="guide" className="block mb-2">Tour Guide Email:</label>
                                <select id="guide" name="guide" className="w-full px-3 py-2 border rounded-md">
                                    <option>Select Tour Guide</option>
                                    {guides?.map((guide, index) => (
                                        <option key={index} value={JSON.stringify({ name: guide.name, email: guide.email })}>
                                            {guide.name} ({guide.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2">Price</label>
                                <input type="text" id="price" name="price" className="w-full px-3 py-2 border rounded-md" required />
                            </div>

                            <div>
                                <label htmlFor="date" className="block mb-2">Date:</label>
                                <DatePicker id="date" name="date" selected={startDate} onChange={(date) => setStartDate(date)} className="w-full px-3 py-2 border rounded-md" />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Book Now!</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;