import { Link } from "react-router-dom";
import useGetAllPolls from "../../../Hooks/useGetAllPolls";
import FakePollCard from "./FakePollCard";
import { ArrowLeft } from "lucide-react";

const FakePoll = () => {
  const [polls] = useGetAllPolls();

  return (
    <div>
   
      <Link className="flex items-center gap-2 justify-center my-4 " to='/'>  <ArrowLeft className="w-4 h-4" /> হোমে ফিরে যান</Link>
  
      {polls?.map((poll) => (
        <div key={poll._id}>
          <FakePollCard poll={poll} />
 
        </div>
      ))}
    </div>
  );
};

export default FakePoll;
