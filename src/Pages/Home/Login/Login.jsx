import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPublic } from "../../../Hooks/usePublic";
import useUser from "../../../Hooks/useUser";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [pin, setPin] = useState("");
//   const [accountType, setAccountType] = useState("");
  const navigate  = useNavigate();
  const { profile, isLoading, isError, refetch } = useUser();
  // console.log(profile)

  const handleLogin =  async(e)  =>{
    e.preventDefault();
    if(identifier.length > 11 || identifier.length < 11){
        toast.warning("Your Phone Number must be at least 11 characters long")
        return;
    } else if(pin.length > 5 || pin.length < 5){
        toast.warning("Your PIN Number must be at least 5 characters long")
        return;
    } 
    
    const mobile = identifier;
    const data ={
        mobile,
        pin
      };
  
      try {
        const response = await axiosPublic.post('/auth/login', data);
    
        // Log the response to check the structure
        // console.log('Login response:', response);
    
        // Check if response.data and response.data.data are defined
        if (response.data && response.data.data) {
          const { token, user } = response.data.data;
    
          if (token && user) {
            localStorage.setItem('token', token);
    
    
            if (user?.accountType === 'user') {
                navigate('/user-dashboard')
              } else if (user?.accountType === 'agent') {
                navigate('/agent-dashboard')
                
              } else if (user?.accountType === 'admin') {
                navigate('/admin-dashboard')
                
              }
            toast.success(`Welcome, ${user?.name}! 🎉`);

            
          } else {
            toast.error('User data is missing in the response.');
            console.error('Response missing user data:', response);
          }
        } else {
          toast.error('Invalid response structure');
          console.error('Unexpected response structure:', response);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Login failed! Please provide valid login details.';
        toast.error(errorMessage);
        console.error('Login error:', err);
      }


   

    }
  
  




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <p className="text-gray-500 text-center mb-4">Enter your credentials to access your account.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
            required
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your 11 digit mobile number "
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
              PIN
            </label>
            <input
            required
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter your 5-digit PIN"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
            required
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select account type</option>
              <option value="user">User</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}

          <div className="flex justify-between mt-6">
            <Link to="/register" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 hover:cursor-pointer">
              Register
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
