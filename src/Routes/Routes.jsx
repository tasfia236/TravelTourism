import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../pages/Auth/SignUp";
import LogIn from "../pages/Auth/LogIn";
import Home from "../pages/Home/Home";

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
        }
      ]
    },
  ]);

export default Routes;