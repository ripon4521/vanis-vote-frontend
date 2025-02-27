import { useQuery } from "react-query";
import { axiosPublic } from "./usePublic";


const useGetNotification = ( ) => {
  const { refetch, data: notification = [] } = useQuery(
    ["notification"],
    async () => {
      const response = await axiosPublic.get("/notification");  // Fixed typo in the endpoint
      return response.data;
    }
  );

// console.log(transactions.data)

  return [notification, refetch];
};

export default useGetNotification;
