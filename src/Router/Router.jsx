import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import CreatePollForm from "../Pages/Home/CreatePollFrom/CreatePollForm";
import FakePoll from "../Pages/Home/FakePoll/FakePoll";
import PrivatePoll from "../Pages/Home/FakePoll/PrivatePoll";
import SinglePolls from "../Pages/Home/FakePoll/SinglePolls";






export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },{
                path:'/polls/create',
                element: <CreatePollForm/>
            },{
                path:'/polls',
                element:<FakePoll/>
            },{
                path:'/private-polls',
                element:<PrivatePoll/>
            },{
                path:'/polls/:id',
                element:<SinglePolls/>
            }
         
          
        ]
    },{
        
            path:'/unauthorized',
            element:<Unauthorized/>
        
    }
   
])