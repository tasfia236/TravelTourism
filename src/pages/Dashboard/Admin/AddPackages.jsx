import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddTourForm = () => {
    const axiosSecure = useAxiosSecure();

    const [images, setGalleryImages] = useState([""]);
    const [tour_plan, setTourPlan] = useState([{ day: "", title: "", description: "" }]);

    const handleGalleryImageChange = (index, event) => {
        const values = [...images];
        values[index] = event.target.value;
        setGalleryImages(values);
    };

    const handleAddGalleryImage = () => {
        setGalleryImages([...images, ""]);
    };

    const handleRemoveGalleryImage = (index) => {
        const values = [...images];
        values.splice(index, 1);
        setGalleryImages(values);
    };

    const handleTourPlanChange = (index, event) => {
        const values = [...tour_plan];
        values[index][event.target.name] = event.target.value;
        setTourPlan(values);
    };

    const handleAddTourPlan = () => {
        setTourPlan([...tour_plan, { day: "", title: "", description: "" }]);
    };

    const handleRemoveTourPlan = (index) => {
        const values = [...tour_plan];
        values.splice(index, 1);
        setTourPlan(values);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const spot_image = form.profileImage.value;
        const tour_type = form.type.value;
        const trip_title = form.triptitle.value;
        const price = form.price.value;
        const description = form.tourdescription.value;
        const wishlist = 0;

        const newTour = {
            spot_image,
            tour_type,
            trip_title,
            price,
            description,
            images,
            tour_plan,
            wishlist
        };

        axiosSecure.post('/tours', newTour)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Tour added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                    setGalleryImages([""]);
                    setTourPlan([{ day: "", title: "", description: "" }]);
                }
            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
        <div className="p-8">
            <h1 className="text-center text-3xl font-black text-blue-500">Add New Tour</h1>
            <div className="card lg:card-side shadow-2xl bg-base-100 my-12">
                <form onSubmit={handleFormSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Spot Image URL</span>
                        </label>
                        <input type="text" id="profileImage" name="profileImage" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tour Type</span>
                        </label>
                        <input type="text" id="type" name="type" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Trip Title</span>
                        </label>
                        <input type="text" id="triptitle" name="triptitle" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="text" id="price" name="price" className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" id="tourdescription" name="tourdescription" className="w-full px-3 py-2 border rounded-md" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Gallery Images</span>
                        </label>
                        {images.map((image, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    name="galleryImage"
                                    value={image}
                                    onChange={(e) => handleGalleryImageChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-md mr-2"
                                />
                                <button type="button" onClick={() => handleRemoveGalleryImage(index)} className="btn btn-danger">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddGalleryImage} className="btn bg-teal-300 mt-2">Add Image</button>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tour Plan</span>
                        </label>
                        {tour_plan.map((plan, index) => (
                            <div key={index} className="mb-2">
                                <input
                                    type="text"
                                    name="day"
                                    value={plan.day}
                                    placeholder="Day"
                                    onChange={(e) => handleTourPlanChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    name="title"
                                    value={plan.title}
                                    placeholder="Title"
                                    onChange={(e) => handleTourPlanChange(index, e)}
                                    className="w-full px-3 py-2 mb-2 border rounded-md"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={plan.description}
                                    placeholder="Description"
                                    onChange={(e) => handleTourPlanChange(index, e)}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <button type="button" onClick={() => handleRemoveTourPlan(index)} className="btn btn-danger mt-2">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddTourPlan} className="btn bg-teal-400 mt-2">Add Plan</button>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTourForm;
