import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://api.server.com.soukhin.shop/api/v1', // Set base URL
    headers: {
      'Content-Type': 'application/json',
    },
});
const usePublic = () => {
  return axiosPublic;
};

export default usePublic;