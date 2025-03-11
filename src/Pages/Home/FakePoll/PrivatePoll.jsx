
import Loader from "../../../Components/Loader";
import useGetAllPolls from "../../../Hooks/useGetAllPolls";

import PrivatePollCard from "./PrivatePollCard";

const PrivatePoll = () => {
  const [polls] = useGetAllPolls();
  const privatePolls = polls?.filter (task => task?.isPrivate === true)
  
  if (polls?.length === 0) {
    return  <Loader/>
    }

  return (
    <div>
   
  
  
      {privatePolls?.map((poll) => (
        <div key={poll._id}>
          <PrivatePollCard poll={poll} />
 
        </div>
      ))}
    </div>
  );
};

export default PrivatePoll;
