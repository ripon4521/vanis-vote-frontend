import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import Regester from "../Pages/Home/Register/Regester";




export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/register",
                element: <Regester/>
            },
          
        ]
    },
    {
        path:'/admin-dashboard',
        element:<DashboardLayout/>,
        children:[
            {
                path:'/admin-dashboard',
                element:<h1>Admin Dashboard</h1>
            }
        ]
    }
])