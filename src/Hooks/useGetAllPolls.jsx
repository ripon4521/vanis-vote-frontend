import { useQuery } from "react-query";
import { axiosPublic } from "./usePublic";


const useGetAllPolls = ( ) => {
  const { refetch, data: polls = [] } = useQuery(
    ["polls"],
    async () => {
      const response = await axiosPublic.get("/polls");  // Fixed typo in the endpoint
      return response.data;
    }
  );

// console.log(transactions.data)

  return [polls, refetch];
};

export default useGetAllPolls;
