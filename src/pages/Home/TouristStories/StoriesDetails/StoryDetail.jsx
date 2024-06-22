import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { FacebookShareButton } from 'react-share'; // Assuming react-share package is installed

const StoryDetail = () => {

    const story = useLoaderData();

    const { imageUrl, title, content, author, date } = story;
    console.log(story);

    const shareUrl = window.location.href;

    return (
        <div className="p-32 text-center">
            {story.imageUrl && <img src={imageUrl} alt={title} className="w-full mb-4 rounded-lg shadow-md" />}
            <h2 className="text-3xl font-bold p-4 text-teal-800">{title}</h2>
            <p className="text-gray-700 mb-4 text-base">{content}</p>
            <p className="text-gray-700 mb-4 text-base"><span className='font-bold'>Author Name:</span> {author}</p>
            <p className="text-gray-700 mb-4 text-base"><span className='font-bold'>Post Date:</span> {date}</p>
            <div className="btn bg-blue-600 text-white" >
                <FacebookShareButton url={shareUrl} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300">
                    Share on Facebook
                </FacebookShareButton>
            </div>
        </div>
    );
};

export default StoryDetail;
