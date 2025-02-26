import { useQuery } from "react-query";
import { axiosPublic } from "./usePublic";


const useSystemBalance = ( ) => {
  const { refetch, data: system_balance = [] } = useQuery(
    ["system_balance"],
    async () => {
      const response = await axiosPublic.get("/systemBalance");  // Fixed typo in the endpoint
      return response.data;
    }
  );

// console.log(transactions.data)

  return [system_balance, refetch];
};

export default useSystemBalance;
