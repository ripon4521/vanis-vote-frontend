
import { Link } from "react-router-dom";
import useGetAllPolls from "../../../Hooks/useGetAllPolls";
import FakePollCard from "./FakePollCard";
import Loader from "../../../Components/Loader";


const FakePoll = () => {
  const [polls] = useGetAllPolls();
  const fakePolls = polls?.filter (task => task?.isPrivate === false);

  if (polls?.length === 0) {
  return  <Loader/>
  }

  return (
    <div>
      {
        polls?.length === 0 ? <>
        <p className="text-center my-10">No aviable right now </p>
       <div className="flex justify-center">
       <Link className="px-2 py-2 rounded-md bg-blue-500 text-white" to='/'>Go Home</Link>
       </div>
        </> : <>
         {fakePolls?.map((poll) => (
        <div key={poll._id}>
          <FakePollCard poll={poll} />
 
        </div>
      ))}
        </>
        
      }
   
    
  
     
    </div>
  );
};

export default FakePoll;
