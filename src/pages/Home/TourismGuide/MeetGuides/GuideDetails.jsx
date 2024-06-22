
import { useLoaderData } from 'react-router-dom';

const GuideDetails = () => {
    const guide = useLoaderData();

    const { name, email, image, number, education, skill, work } = guide;
    console.log(guide);


    return (
        <div className="pt-32 pb-12 text-center">
            {guide.image && <img src={image} alt={name} className="btn-circle btn-lg w-72 h-72  mb-10 mx-auto shadow-md" />}
            <h2 className="text-3xl font-bold p-4 text-teal-800">{name}</h2>
            <p className="text-gray-700 mb-4 text-base"><span className='font-bold'>Email:</span>   {email}</p>
            <p className="text-gray-700 mb-4 text-base"><span className='font-bold'>Contact Number:</span> {number}</p>
            <p className="text-gray-700 mb-4 text-base"><span className='font-bold'>Education:</span> {education}</p>
            <div>
            <p className="text-gray-700 mb-4 text-base font-bold">Skills:</p>
            <p className="text-gray-700 mb-4 text-base" >{skill}</p>
            </div>
            <div>
            <p className="text-gray-700 mb-4 text-base font-bold">Work Experience:</p>
            <p className="text-gray-700 mb-4 text-base" >{work}</p>
            </div>
        </div>
    );
};

export default GuideDetails;