
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const TouristStories = () => {
     
    const { isPending, isError, error, data: stories } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/stories');
            return res.json();
        }
    })
    console.log(stories);

    if (isPending) {
        return <span className="loading loading-spinner text-primary"></span>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    return (
        <div className="mx-auto m-5 text-center">
            <h2 className="font-black text-sky-600 text-4xl py-10">Tourist Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {stories.slice(0,4).map(story => (
                    <Link to={`/story/${story._id}`} key={story._id} className="border border-blue-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                        <div className="p-4">
                            <h3 className="text-2xl text-teal-800 font-bold mb-2">{story.title}</h3>
                            <p className="text-gray-700">{story.content}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Link to="/all-stories" className="btn btn-outline mt-8 text-blue-600 hover:underline">All Stories</Link>
        </div>
    );
};

export default TouristStories;
