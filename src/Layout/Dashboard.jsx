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
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-blue-400">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">DashBoard</div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {links}
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

                </div>
                {/* Dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {links}
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
        </div>
    );
};

export default Dashboard;
