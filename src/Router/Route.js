import { createBrowserRouter } from "react-router-dom";
import About from "../Components/About/About";
import Home from "../Components/HomePage/Home";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
        ]
    }
])