import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../pages/Auth/SignUp";
import LogIn from "../pages/Auth/LogIn";
import Home from "../pages/Home/Home";
import AllPackages from "../pages/AllPackages/AllPackages";
import Detalis from "../pages/PackageDeatils/Detalis";

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
          loader: ({params}) => fetch(`http://localhost:8000/spots/${params.id}`)
        }
      ]
    },
  ]);

export default Routes;