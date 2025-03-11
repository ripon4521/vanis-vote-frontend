import {  useParams } from "react-router-dom";
import useGetAllPolls from "../../../Hooks/useGetAllPolls";
import FakePollCard from "./FakePollCard";
import Loader from "../../../Components/Loader";


const SinglePolls = () => {
  const [polls] = useGetAllPolls();
  const {id} = useParams();
const singlePolls = polls?.filter (x => x._id === id)
  

if (polls?.length === 0) {
    return  <Loader/>
    }

  return (
    <div>
   
     
  
      {singlePolls?.map((poll) => (
        <div key={poll._id}>
          <FakePollCard poll={poll} />
 
        </div>
      ))}
    </div>
  );
};

export default SinglePolls;
