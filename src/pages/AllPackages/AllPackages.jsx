
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PackageCard from "./PackageCard";


const AllPackages = () => {
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
        <div>
            <h1 className="font-black text-sky-600 text-4xl text-center pt-24 pb-12">All Packages</h1>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-y-5 gap-8">
                {
                    spots?.map(spot => <PackageCard
                        key={spot._id}
                        spot={spot}
                    ></PackageCard>)
                }
            </div>
        </div>

    );
};

export default AllPackages;