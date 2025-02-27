import { useQuery } from "react-query";
import { axiosPublic } from "./usePublic";


const useAllRecharge = ( ) => {
  const { refetch, data: balance = [] } = useQuery(
    ["balance"],
    async () => {
      const response = await axiosPublic.get("/balance");  // Fixed typo in the endpoint
      return response.data;
    }
  );

// console.log(transactions.data)
// console.log(balance)
  return [balance, refetch];

};

export default useAllRecharge;
