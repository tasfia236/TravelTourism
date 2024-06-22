import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Form from "./Form";
import useTourGuide from "../../../hooks/useTourGuide";

const Profile = () => {

    const [isTourGuide] = useTourGuide();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log(user?.email)
    const { data: profile = [], refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user.email}`);
            return res.data;
        }
    })
    console.log(profile)


    return (
        <div className="p-8">
            <h1 className="text-center text-3xl font-black text-blue-800">My Profile</h1>
            <div className=" flex flex-col mx-auto lg:flex-row justify-evenly gap-10 px-16 sm:pl-32 py-12 w-full">
                <div className=" w-48 mx-12">
                    <img src={profile[0]?.image} className=" rounded-btn" alt="" />
                </div>
                <div className="py-2 space-y-12">
                    <div>
                        <h1 className="text-xl"><span className="font-bold"> Name:</span>  {profile[0]?.name}</h1>
                        <h1 className="text-xl"><span className="font-bold"> Email:</span>  {profile[0]?.email}</h1>
                    </div>
                    <div>
                        <h1 className="text-xl"><span className="font-bold">Contact Number:</span>  {profile[0]?.number}</h1>
                        <h1 className="text-xl"><span className="font-bold">Education:</span>  {profile[0]?.education}</h1>
                    </div>
                    <div>
                        <h1 className="text-xl"><span className="font-bold">Skills:</span>  {profile[0]?.skill}</h1>
                        <h1 className="text-xl"><span className="font-bold">Education:</span>  {profile[0]?.work}</h1>
                    </div>
                </div>
            </div>
            {isTourGuide &&
                <div className="form-control mb-32">
                    <h1 className="text-2xl text-blue-800 font-bold text-center">Review</h1>
                    <h1 className="text-lg text-center">good</h1>
                </div>

            }
            <Form profile={profile} refetch={refetch}></Form>
        </div>
    );
};

export default Profile;