import { useState } from "react";
import Header from "../Header/Header";
import useGetAllUser from "../../Hooks/useGetAllUser";
import useUser from "../../Hooks/useUser";
import useTransaction from "../../Hooks/useTansction";
import TransctionPage from "../User/TransctionPage";

export default function AdminDashboard() {
  const { profile  } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("user-management");
  const [showBalance, setShowBalance] = useState(false);
  const [ allUsers] = useGetAllUser(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactions] = useTransaction(profile?.mobile, profile?._id);
  const transactionsData = transactions?.data;
  const [filteredTransactions, setfilteredTransactions] = useState();
 

  // console.log(allUsers?.data)
 

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  }
  
  const handleShowBalance = () => {
    setShowBalance(true);
    setTimeout(() => {
      setShowBalance(false);
    }, 5000);
  };


 // Pass searchTerm here
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.mobile.value);
  };

  const showTransction =async (mobile, _id)=> {
    setSelectedUser(mobile);
    setIsModalOpen(true);
    const data = transactionsData?.filter(
      (tran) =>
        tran?.senderId?._id === _id || tran?.receiverNumber === mobile
    );
    setfilteredTransactions(data);
    console.log(data)

  }

  return (
    <div className="container mx-auto py-10">
 <div className="flex justify-between items-center md:flex-row flex-col ">

 <h1 className="text-3xl font-bold mb-6 ">Admin Dashboard</h1>
 <Header/>
 </div>
 <div className="border border-gray-200 rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Balance</h2>
            <p className="text-sm text-gray-500">Click to reveal your balance and income</p>
          </div>
          {showBalance ? (
            <p className="text-lg font-semibold"><span className='text-red-500'>{profile?.balance}</span> Tk</p>
          ) : (
            <button className="w-full border  border-gray-200 cursor-pointer rounded-lg py-2 hover:bg-gray-100" onClick={handleShowBalance}>
              Show Balance and Income
            </button>
          )}
        </div>
      {/* Tabs */}
      <div className="my-6">
        <div className="flex space-x-4 border-b border-gray-200 flex-col md:flex-row gap-5 ">
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "user-management"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer border border-gray-200 rounded-md"
            }`}
            onClick={() => setActiveTab("user-management")}
          >
            User/Agent Management
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "agent-approval"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer border border-gray-200 rounded-md"
            }`}
            onClick={() => setActiveTab("agent-approval")}
          >
            Agent Approval
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "transaction-monitoring"
                ? "border-b-2  border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer border border-gray-200 rounded-md"
            }`}
            onClick={() => setActiveTab("transaction-monitoring")}
          >
            Transaction Monitoring
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "recharge-withdraw"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer border border-gray-200 rounded-md"
            }`}
            onClick={() => setActiveTab("recharge-withdraw")}
          >
            Recharge & Withdraw
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      {activeTab === "user-management" && (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">User/Agent Management</h2>
            <div className="space-y-4">
            <form onSubmit={handleSearch}>
            <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-semibold">
                  Search User/Agent
                </label>
                <input
                  id="search"
                  name="mobile"
                  className="w-full p-2 border border-gray-200 rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
              <button  className="bg-blue-500 text-white py-2 px-4 rounded-md my-2">
                Search
              </button>
            </form>
            <div className="mt-4 overflow-x-auto">
  <table className="min-w-full table-auto">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="py-2 px-4 text-left">Name</th>
        <th className="py-2 px-4 text-left">Phone</th>
        <th className="py-2 px-4 text-left">Role</th>
        <th className="py-2 px-4 text-left">Balance</th>
        <th className="py-2 px-4 text-left">Transaction</th>
        <th className="py-2 px-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        allUsers?.data?.map((user, index) => {
          return (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 px-4">{user?.name}</td>
              <td className="py-2 px-4">{user?.mobile}</td>
              <td className="py-2 px-4">{user?.accountType}</td>
              <td className="py-2 px-4">{user?.balance.toFixed(2)} Tk</td>
              <td onClick={() => showTransction(user?.mobile, user?._id)} className="py-2 px-4 cursor-pointer text-red-500 rounded-md">
  Show Transaction
</td>
  {/* Modal */}
  {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="modal modal-open">
      <div className="modal-box md:w-3/4 md:max-w-4xl md:p-6"> {/* Custom width and padding */}
        <h2 className="text-xl mb-4">Transaction Details for {selectedUser?.name}</h2>
        
        {/* Transaction Page */}
        <TransctionPage filteredTransactions={filteredTransactions} />

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


              <td className="py-2 px-4 flex">
                <button className="bg-red-500 text-white py-1 px-3 rounded-md mr-2">
                  Block
                </button>
                <button className="bg-green-500 text-white py-1 px-3 rounded-md">
                  Unblock
                </button>
              </td>
            </tr>
          );
        })
      }
    </tbody>
  </table>
</div>

            </div>
          </div>
        </div>
      )}

      {activeTab === "agent-approval" && (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Agent Approval</h2>
            <div className="space-y-4">
              <p>Pending agent requests will be displayed here.</p>
              <div className="flex space-x-2 mt-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded-md">
                  Approve
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-md">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "transaction-monitoring" && (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Transaction Monitoring</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Total System Balance</h3>
                <p className="text-2xl font-bold">৳ 0</p>
              </div>
              <p>Transaction list will be displayed here.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "recharge-withdraw" && (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Recharge & Withdraw Requests</h2>
            <div className="space-y-4">
              <p>Recharge and withdraw requests will be displayed here.</p>
              <div className="flex space-x-2 mt-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded-md">
                  Approve
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-md">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>


      )}

      
    </div>
  );
}
