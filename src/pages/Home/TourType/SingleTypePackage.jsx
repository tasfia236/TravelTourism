
import { Link } from 'react-router-dom';

const SingleTypePackage = ({ spot }) => {
    const { _id, spot_image, tour_type, trip_title, price} = spot;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={spot_image} alt="Spot" className="rounded-xl w-[310px] h-[200px]" />
            </figure >
            <div className="card-body items-center text-center">
                <h2 className="card-title">{trip_title}</h2>
                <p>{tour_type}</p>
                <p>Price: {price}</p>
                <div className="card-actions">
                    <Link to={`/details/${_id}`}><button className="btn btn-primary">View Package</button></Link>
                </div>
            </div>
        </div >
    );
};

export default SingleTypePackage;
