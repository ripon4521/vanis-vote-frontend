import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000/', // Set base URL
    headers: {
      'Content-Type': 'application/json',
    },
});
const usePublic = () => {
  return axiosPublic;
};

export default usePublic;