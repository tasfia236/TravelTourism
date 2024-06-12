
import { useQuery } from "@tanstack/react-query";
import SinglePackage from "./SinglePackage";

const Packages = () => {
    const { isPending, isError, error, data: spots } = useQuery({
        queryKey: ['spots'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/spots');
            return res.json();
        }
    })
    console.log(spots);

    
    if (isPending) {
        return <span className="loading loading-spinner text-primary"></span>
    }

    if (isError) {
        return <p>{error.message}</p>
    }


    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-y-5 m-12 gap-8">
                                {
                        spots?.slice(0, 3).map(spot => <SinglePackage key={spot._id} spot={spot}></SinglePackage>)
                    }
        </div>
    );
};

export default Packages;