import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTourGuide = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTourGuide, isPending: isTourGuideLoading } = useQuery({
        queryKey: [user?.email, 'isTourGuide'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tourGuide/${user.email}`);
            console.log(res.data);
            return res.data?.tourGuide;
        }
    })
    return [isTourGuide, isTourGuideLoading]
};

export default useTourGuide;