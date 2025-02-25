import { useState } from "react";
import useUser from "../../Hooks/useUser";
import Header from "../Header/Header";
import useTransaction from "../../Hooks/useTansction";
import TransctionPage from "./TransctionPage";
import { toast } from "react-toastify";
import { axiosPublic } from "../../Hooks/usePublic";


export default function User() {
  const [activeTab, setActiveTab] = useState("send-money");
  const [showBalance, setShowBalance] = useState(false);
  const { profile } = useUser();
  const [transactions, refetch] = useTransaction( profile?.mobile, profile?._id);
  const  transactionsData = transactions?.data;
  const filteredTransactions = transactionsData?.filter(
    (tran) =>
      tran?.senderId?._id === profile?._id || tran?.receiverNumber === profile?.mobile
  );


  if (!profile) {
    refetch();
    return window.location.href('/');
  }
//   console.log(profile)

const handleShowBalance = () => {
  setShowBalance(true);
  setTimeout(() => {
    setShowBalance(false);
  }, 5000);
};

const handleSendMoney = async (e) => {
  e.preventDefault();
  const amount = Number(e.target.amount.value);
  const receiverNumber = e.target.phoneNumber.value;
  const fee = 5;
  const type = "SendMoney";
  const transactionId = '';
  const senderId = profile?._id;

  if (amount < 50) {
    toast.warning("Amount should be greater than 50");
    return;
  } else if (receiverNumber.length !== 11) {
    toast.warning("Invalid mobile number. Please enter a 11-digit number");
    return;
  }

  const data = {
    amount,
    receiverNumber,
    fee,
    type,
    transactionId,
    senderId,
  };

  try {
    const response = await axiosPublic.post('/transction/create-transaction', data);
    toast.success(`Transaction Successful: Sent ${response.data.data.amount}Tk to ${response.data.data.receiverNumber} and fee ${response.data.data.fee}Tk`);
    refetch();
    handleShowBalance();
    console.log(response);
  } catch (err) {
    // Handle the error from the server
    if (err.response) {
      // Server responded with an error message
      const errorMessage = err.response.data.message || "Reciver Number Not Found!";
      toast.error(`Error: ${errorMessage}`);
      console.error("Server error:", err.response.data);
    } else if (err.request) {
      // No response was received
      toast.error("Network error. Please try again later.");
      console.error("Network error:", err.request);
    } else {
      // Error occurred during setup of the request
      toast.error(`Error: ${err.message || "Something went wrong!"}`);
      console.error("Request error:", err.message);
    }
  }

  // console.log(data);
};


  

   

  return (
    <div className="max-w-6xl mx-auto py-10">
          <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 ">User Dashboard     </h1>
          <Header/>
      
          </div>
      
      <div className="grid gap-6">

        {/* Balance Card */}
        <div className="border border-gray-200 rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Balance</h2>
            <p className="text-sm text-gray-500">Click to reveal your balance and income</p>
          </div>
          {showBalance ? (
            <p className="text-lg font-semibold"><span className="text-red-500">{profile?.balance}</span> Tk</p>
          ) : (
            <button className="w-full border  border-gray-200 cursor-pointer rounded-lg py-2 hover:bg-gray-100" onClick={handleShowBalance}>
              Show Balance and Income
            </button>
          )}
        </div>
        {/* Tabs Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setActiveTab("send-money")}
              className={`py-2 rounded-md ${activeTab === "send-money" ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer"}`}
            >
              Send Money
            </button>
            <button
              onClick={() => setActiveTab("cash-in")}
              className={`py-2 rounded-md ${activeTab === "cash-in" ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer"}`}
            >
              Cash In
            </button>
            <button
              onClick={() => setActiveTab("cash-out")}
              className={`py-2 rounded-md ${activeTab === "cash-out" ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer" }`}
            >
              Cash Out
            </button>
          </div>

          {/* Send Money Tab */}
          {activeTab === "send-money" && (
            <div >
              <h2 className="text-xl font-semibold mb-2">Send Money</h2>
              <p className="text-gray-500 mb-4">Send money to another user</p>
           <form onSubmit={handleSendMoney}>
           <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient Number</label>
                  <input
                  required
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter recipient's number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                  required
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
               
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer">
                  Send Money
                </button>
              </div>
           </form>
            </div>
          )}

          {/* Cash In Tab */}
          {activeTab === "cash-in" && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Cash In</h2>
              <p className="text-gray-500 mb-4">Add money to your account</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agent Number</label>
                  <input
                    type="text"
                    placeholder="Enter agent's number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer">
                  Cash In
                </button>
              </div>
            </div>
          )}

          {/* Cash Out Tab */}
          {activeTab === "cash-out" && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Cash Out</h2>
              <p className="text-gray-500 mb-4">Withdraw money from your account</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agent Number</label>
                  <input
                    type="text"
                    placeholder="Enter agent's number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PIN</label>
                  <input
                    type="password"
                    placeholder="Enter your PIN"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer">
                  Cash Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-gray-500 mb-4">Your last 100 transactions</p>

          <div>
           
            <TransctionPage filteredTransactions={filteredTransactions}/>
          </div>
       
        
      
        </div>
      </div>
    </div>
  );
}
