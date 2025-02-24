import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Regester() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pin: "",
    nid: "",
    accountType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDeafaultBalance = 40;
    const agentDeafaultBalance = 1000000;
    let balance = 0;
    if (formData.accountType === "user") {
      balance = userDeafaultBalance;
    } else if (formData.accountType === "agent") {
      balance = agentDeafaultBalance;
    }

    if (formData.mobile.length > 11 || formData.mobile.length < 11) {
        toast.warning("Invalid mobile number. Please enter a 11-digit number.");
      return;
        
    }else if (formData.pin.length > 5 || formData.pin.length < 5) {
        toast.warning("Invalid PIN. Please enter a 5-digit number.");
      return;
    } else if (formData.accountType === '') {
        toast.warning("Please select an account type.");
      return;
        
    }


    const data = {
        name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      pin: formData.pin,
      nid: formData.nid,
      accountType: formData.accountType,
      balance,
    }

    console.log(data); // Replace with form submission logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        <p className="text-gray-500 text-center mb-4">Create a new account.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
            required
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
            required
              id="mobile"
              name="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
            required
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              name="pin"
              type="password"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter a 5-digit PIN"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="nid" className="block text-sm font-medium text-gray-700">
              NID
            </label>
            <input
            required
              id="nid"
              name="nid"
              type="text"
              value={formData.nid}
              onChange={handleChange}
              placeholder="Enter your NID number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
            required
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select account type</option>
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <Link to="/" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
              Back to Login
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
