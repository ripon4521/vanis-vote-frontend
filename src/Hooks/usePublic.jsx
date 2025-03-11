import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://vanis-vote.vercel.app', // Set base URL
    headers: {
      'Content-Type': 'application/json',
    },
});
const usePublic = () => {
  return axiosPublic;
};

export default usePublic;