import { useQuery } from "react-query";
import { axiosPublic } from "./usePublic";


const useTransaction = ( mobile, _id) => {
    // console.log( mobile,_id)

  // Fetch transactions from the server
  const { refetch, data: transactions = [] } = useQuery(
    ["transaction"],
    async () => {
      const response = await axiosPublic.get("/transction");  // Fixed typo in the endpoint
      return response.data;
    }
  );

// console.log(transactions.data)

  return [transactions, refetch];
};

export default useTransaction;
