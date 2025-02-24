import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";

import Regester from "../Pages/Home/Register/Regester";
import User from "../Pages/User/User";
import AgentDashboard from "../Pages/Agent/AgentDashboard";
import AdminDashboard from "../Pages/Admin/AdminDashboard";




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
            {
                path:'/user-dashboard',
                element:<User/>
            },{
                path:'/agent-dashboard',
                element:<AgentDashboard/>
            },{
                path:'/admin-dashboard',
                element:<AdminDashboard/>
            }
          
        ]
    },
   
])