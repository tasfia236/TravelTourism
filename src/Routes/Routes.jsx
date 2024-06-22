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
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import Profile from "../pages/Dashboard/Profile/Profile";
import AddPackages from "../pages/Dashboard/Admin/AddPackages";
import AssignedTour from "../pages/Dashboard/TourGuide/AssignedTour";
import ProtectedRoute from "./ProtectedRoute";
import MyBooking from "../pages/Dashboard/User/MyBooking";
import MyWishlist from "../pages/Dashboard/User/MyWishlist";
import RequestToAdmin from "../pages/Dashboard/User/RequestToAdmin";
import AllStories from "../pages/Home/TouristStories/AllStory/AllStories";
import StoryDetail from "../pages/Home/TouristStories/StoriesDetails/StoryDetail";

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
      },
      {
        path: "/all-stories",
        element: <AllStories></AllStories>
      },
      {
        path: "/story/:id",
        element: <StoryDetail></StoryDetail>,
        loader: ({ params }) => fetch(`http://localhost:8000/story/${params.id}`)
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
        element: <ProtectedRoute><AddPackages></AddPackages></ProtectedRoute>

      },
      {
        path: 'manageUsers',
        element: <ProtectedRoute><ManageUser></ManageUser></ProtectedRoute>
      },

      //Tour Guuide Panel
      {
        path: 'assign',
        element: <ProtectedRoute><AssignedTour></AssignedTour></ProtectedRoute>
      },

      //User Panel
      {
        path: 'mybooking',
        element: <ProtectedRoute><MyBooking></MyBooking></ProtectedRoute>
      },
      {
        path: 'mywishlist',
        element: <ProtectedRoute><MyWishlist></MyWishlist></ProtectedRoute>
      },
      {
        path:  'requestAdmin',
        element: <ProtectedRoute><RequestToAdmin></RequestToAdmin></ProtectedRoute>
      }
    ]
  }
]);

export default Routes;