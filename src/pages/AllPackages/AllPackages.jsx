
import { useQuery } from "@tanstack/react-query";
import PackageCard from "./PackageCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const AllPackages = () => {
    const axiosPublic = useAxiosPublic();
    const { isPending, isError, error, data: spots, refetch } = useQuery({
        queryKey: ['spots'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allspots');
            return res.data;
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
        <div className="pb-12 px-2">
            <h1 className="font-black text-sky-600 text-4xl text-center pt-24 pb-12">All Packages</h1>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-y-5 gap-8">
                {
                    spots?.map(spot => <PackageCard
                        key={spot._id}
                        spot={spot}
                        refetch={refetch}
                    ></PackageCard>)
                }
            </div>
        </div>

    );
};

export default AllPackages;