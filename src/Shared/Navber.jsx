import { IoPersonOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';

const Navber = () => {

    const { user, logOut } = useContext(AuthContext) || {};

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const NavList = <>
        <li><Link to="/">Home</Link> </li>
        <li> <Link to="/community">Community</Link> </li>
        <li> <Link to="/blogs">Blogs</Link> </li>
        <li> <Link to="/about Us">About Us</Link> </li>
        <li> <Link to="/contact Us">Contact Us</Link> </li>
    </>

    return (
        <div className="navbar fixed z-10 bg-base-100 bg-opacity-15 text-black max-w-7xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {NavList}
                    </ul>
                </div>
                <img className='w-20 px-2' src={logo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavList}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            user && <>

                                <li><a onClick={handleLogOut} >Logout</a></li>
                                <li className=" pt-2">
                                    {user.email}
                                </li>
                            </>
                        }
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    {
                        user && <>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle z-[9999] avatar">
                                {user.photoURL ? <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                </div>
                                    : <div className="rounded-full pt-3 pl-3 w-10"><IoPersonOutline></IoPersonOutline></div>
                                }
                            </div>
                        </>
                    }
                    <ul tabIndex={0} className="lg:hidden menu menu-sm fixed dropdown-content mt-1 z-[9999] p-2 shadow bg-base-100 rounded-box w-52">
                        {user && <>
                            <li className="pl-3 font-bold text-lg">{user.displayName}</li>
                            <li className="pl-3">{user.email}</li>
                            <li><a onClick={handleLogOut} >Logout</a></li>

                        </>
                        }
                    </ul>
                </div>
                <div className="flex gap-3">
                    {
                        !user && <>
                            <Link to='/login'>
                                <button className="btn btn-sm">Sign In</button>
                            </Link>
                            <Link to='/signup'>
                                <button className="btn btn-sm bg-red-600 text-white">Sign Up</button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navber;