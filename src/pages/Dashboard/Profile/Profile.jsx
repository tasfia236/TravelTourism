import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Form from "./Form";

const Profile = () => {

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
            <div className=" flex justify-between gap-10 px-16 pr-24 py-12 w-full">
                <div className=" w-40 ml-20">
                    <img src={profile[0]?.image} className=" rounded-btn" alt="" />
                </div>
                <div  className="py-12 space-y-12">
                    <h1 className="text-xl"><span className="font-bold">{profile[0]?.role} Name:</span>  {profile[0]?.name}</h1>
                    <h1 className="text-xl"><span className="font-bold">{profile[0]?.role} Email:</span>  {profile[0]?.email}</h1>
                </div>
            </div>
            <Form profile={profile} refetch={refetch}></Form>
        </div>
    );
};

export default Profile;