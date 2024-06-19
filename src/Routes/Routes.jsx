import {
  createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../pages/Auth/SignUp";
import LogIn from "../pages/Auth/LogIn";
import Home from "../pages/Home/Home";
import AllPackages from "../pages/AllPackages/AllPackages";
import Detalis from "../pages/PackageDeatils/Detalis";
import Dashboard from "../Layout/Dashboard";
import ManageUser from "../pages/Dashboard/ManageUser";
import Profile from "../pages/Dashboard/Profile/Profile";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <LogIn></LogIn>
      },
      {
        path: 'allpackages',
        element: <AllPackages></AllPackages>
      },
      {
        path: 'details/:id',
        element: <Detalis></Detalis>,
        loader: ({ params }) => fetch(`http://localhost:8000/spots/${params.id}`)
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'profile',
        element: <Profile></Profile>
      },

      //Admin Panel
      {
        path: 'addPackage',
   //     element: <AddPackage></AddPackage>

      },
      {
        path: 'manageUsers',
        element: <ManageUser></ManageUser>
      }
    ]
  }
]);

export default Routes;