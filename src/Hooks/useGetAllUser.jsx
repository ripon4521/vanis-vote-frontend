import { useQuery } from "react-query";
import { axiosPublic } from "./usePublic";

const useGetAllUser = (searchTerm = '') => {
  const { refetch, data: allUsers } = useQuery(
    ["allUsers", searchTerm], 
    async () => {
      const response = await axiosPublic.get("/user", {
        params: searchTerm.trim() ? { searchTerm } : undefined, 
      });
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Disable refetching when switching tabs
    }
  );

  return [allUsers, refetch];
};

export default useGetAllUser;
