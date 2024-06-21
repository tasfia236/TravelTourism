import {
    FaAd, FaBook, FaCalendar, FaEnvelope, FaHeart, FaHome, FaList, FaPlus,
    FaSearch, FaShoppingCart, FaUsers, FaUtensils
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTourGuide from "../hooks/useTourGuide";

const Dashboard = () => {
    // Get the isAdmin value from custom hook
    const [isAdmin] = useAdmin();
    const [isTourGuide] = useTourGuide();

    // Admin specific links
    const adminLinks = (
        <>
            <li>
                <NavLink to="/dashboard/profile">
                    <FaHome></FaHome>
                    Admin Profile</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/addPackage">
                    <FaUtensils></FaUtensils>
                    Add Package</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manageUsers">
                    <FaUsers></FaUsers>
                    Manage Users</NavLink>
            </li>
        </>
    );

    const tourGuideLinks = (
        <>
            <>
                <li>
                    <NavLink to="/dashboard/profile">
                        <FaHome></FaHome>
                        Tour Guide Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/assign">
                        <FaList></FaList>
                        My Assigned Tours</NavLink>
                </li>
            </>
        </>
    )

    // User specific links
    const userLinks = (
        <>
            <li>
                <NavLink to="/dashboard/profile">
                    <FaHome></FaHome>
                    User Profile</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/mybooking">
                    <FaList></FaList>
                    My Bookings</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/mywishlist">
                    <FaHeart></FaHeart>
                    My WishList</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/requestAdmin">
                    <FaPlus></FaPlus>
                    Request to Admin</NavLink>
            </li>
        </>

    );

    let links;
    if (isAdmin) {
        links = adminLinks;
    } else if (isTourGuide) {
        links = tourGuideLinks;
    } else {
        links = userLinks;
    }

    return (
        <div className="flex">
            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-blue-400">
                <ul className="menu py-12 px-5">
                    {links}
                    {/* Shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope /> Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
