import { useQuery } from "react-query";
import { axiosPublic } from "./usePublic";


const useGetWithdraw = ( ) => {
  const { refetch, data: withdraw = [] } = useQuery(
    ["withdraw"],
    async () => {
      const response = await axiosPublic.get("/withdraw");  // Fixed typo in the endpoint
      return response.data;
    }
  );

// console.log(transactions.data)

  return [withdraw, refetch];
};

export default useGetWithdraw;
