import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";

import Regester from "../Pages/Home/Register/Regester";
import User from "../Pages/User/User";
import AgentDashboard from "../Pages/Agent/AgentDashboard";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Private from "../Private/Private";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import UserPrivate from "../Private/UserPrivate";
import AgentPrivate from "../Private/AgentPrivate";
import ViewTransctionDetails from "../Pages/Admin/TransctionMonitor/ViewTransctionDetails";





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
                element:<UserPrivate><User/></UserPrivate>
            },{
                path:'/agent-dashboard',
                element:<AgentPrivate><AgentDashboard/></AgentPrivate>
            },{
                path:'/admin-dashboard',
                element:<Private><AdminDashboard/></Private>
            },{
                path:`/admin-dashboard/transction-details/:id`,
                element:<Private><ViewTransctionDetails/></Private>
            }
          
        ]
    },{
        
            path:'/unauthorized',
            element:<Unauthorized/>
        
    }
   
])