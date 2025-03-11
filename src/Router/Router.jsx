import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import CreatePollForm from "../Pages/Home/CreatePollFrom/CreatePollForm";
import FakePoll from "../Pages/Home/FakePoll/FakePoll";






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
                path:'/polls/fakePoll',
                element:<FakePoll/>
            }
         
          
        ]
    },{
        
            path:'/unauthorized',
            element:<Unauthorized/>
        
    }
   
])