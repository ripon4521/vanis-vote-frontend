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
  const { profile, refetch } = useUser();
  const [transactions] = useTransaction(profile?.mobile, profile?._id);
  const transactionsData = transactions?.data;
  const filteredTransactions = transactionsData?.filter(
    (tran) =>
      tran?.senderId?._id === profile?._id || tran?.receiverNumber === profile?.mobile
  );

  if (!profile) {
    refetch();
    return window.location.href = '/';
  }

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
      toast.warning("Invalid mobile number. Please enter an 11-digit number");
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
      const response = await axiosPublic.post('/sendmoney/create-sendmoney', data);
      toast.success(`✅ Sent ৳${response.data.data.amount} to ${response.data.data.receiverNumber} (Fee: ৳${response.data.data.fee})`);
      refetch();
      handleShowBalance();

      if (Notification.permission === "granted") {
        const updatedBalance = profile?.balance - amount - fee; // Calculate updated balance after fee
        new Notification(`💳 Your balance has been updated: ৳${updatedBalance}`);
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const updatedBalance = profile?.balance - amount - fee;
            new Notification(`💳 Your balance has been updated: ৳${updatedBalance}`);
          }
        });
      }
      console.log(response);
    } catch (err) {
      let errorMessage = "Something went wrong!";

      if (err.response) {
        const contentType = err.response.headers["content-type"];

        if (contentType?.includes("text/html")) {
          const regex = /Error:\s(.+?)\./;
          const match = err.response.data.match(regex);
          errorMessage = match ? `Error: ${match[1]}.` : "An unexpected error occurred.";
        } else {
          errorMessage = err.response.data.message || "Receiver Number Not Found!";
        }

        toast.error(`🚫 ${errorMessage}`);
        console.error("Server error:", errorMessage);
      } else if (err.request) {
        toast.error("📡 Network error. Please try again later.");
        console.error("Network error:", err.request);
      } else {
        toast.error(`⚠️ ${err.message || errorMessage}`);
        console.error("Request error:", err.message);
      }
    }
  };

  const handleCashOut = async (e) => {
    e.preventDefault();
    const amount = Number(e.target.amount.value);
    const receiverNumber = e.target.agentNumber.value;
    const fee = 0;
    const type = "CashOut";
    const transactionId = '';
    const senderId = profile?._id;
    const pin = e.target.pinNumber.value;

    if (amount < 50) {
      toast.warning("Amount should be greater than 50");
      return;
    } else if (receiverNumber.length !== 11) {
      toast.warning("Invalid mobile number. Please enter an 11-digit number");
      return;
    } else if (pin.length < 5 || pin.length > 5) {
      toast.warning("Invalid Pin , Pin Must be 5 charctar long");
      return;
    }

    const data = {
      amount,
      receiverNumber,
      fee,
      type,
      transactionId,
      senderId,
      pin
    };

    try {
      const response = await axiosPublic.post('/cashout/create-cashout', data);
      toast.success(`✅ Cash Out Success. ৳${response.data.data.amount} to ${response.data.data.receiverNumber} (Fee: ৳${response.data.data.fee})`);
      refetch();
      handleShowBalance();

      if (Notification.permission === "granted") {
        const updatedBalance = profile?.balance - amount - fee; // Calculate updated balance after fee
        new Notification(`💳 Your balance has been updated: ৳${updatedBalance}`);
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const updatedBalance = profile?.balance - amount - fee;
            new Notification(`💳 Your balance has been updated: ৳${updatedBalance}`);
          }
        });
      }
      console.log(response);
    } catch (err) {
      let errorMessage = "Something went wrong!";

      if (err.response) {
        const contentType = err.response.headers["content-type"];

        if (contentType?.includes("text/html")) {
          const regex = /Error:\s(.+?)\./;
          const match = err.response.data.match(regex);
          errorMessage = match ? `Error: ${match[1]}.` : "An unexpected error occurred.";
        } else {
          errorMessage = err.response.data.message || "Receiver Number Not Found!";
        }

        toast.error(`🚫 ${errorMessage}`);
        console.error("Server error:", errorMessage);
      } else if (err.request) {
        toast.error("📡 Network error. Please try again later.");
        console.error("Network error:", err.request);
      } else {
        toast.error(`⚠️ ${err.message || errorMessage}`);
        console.error("Request error:", err.message);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <h1 className="text-3xl font-bold mb-6 ">User Dashboard</h1>
        <Header />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Balance Card */}
        <div className="border border-gray-200 rounded-lg shadow p-6 lg:w-[1150px] md:w-[750px]">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Balance</h2>
            <p className="text-sm text-gray-500">Click to reveal your balance and income</p>
          </div>
          {showBalance ? (
            <p className="text-lg font-semibold"><span className="text-red-500">{profile?.balance}</span> Tk</p>
          ) : (
            <button className="w-full border border-gray-200 cursor-pointer rounded-lg py-2 hover:bg-gray-100" onClick={handleShowBalance}>
              Show Balance and Income
            </button>
          )}
        </div>

        {/* Tabs Section */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setActiveTab("send-money")}
              className={`py-2 rounded-md ${activeTab === "send-money" ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer"}`}
            >
              Send Money
            </button>

            <button
              onClick={() => setActiveTab("cash-out")}
              className={`py-2 rounded-md ${activeTab === "cash-out" ? "bg-blue-500 text-white" : "bg-gray-200 cursor-pointer"}`}
            >
              Cash Out
            </button>
          </div>

          {/* Send Money Tab */}
          {activeTab === "send-money" && (
            <div>
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
                      className="md:w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      required
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      className="md:w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="md:w-full px-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer">
                    Send Money
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cash Out Tab */}
          {activeTab === "cash-out" && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Cash Out</h2>
              <p className="text-gray-500 mb-4">Withdraw money from your account</p>
              <form onSubmit={handleCashOut}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      name="amount"
                      required
                      type="number"
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Agent Number</label>
                    <input
                      name="agentNumber"
                      required
                      type="text"
                      placeholder="Enter agent's number"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PIN</label>
                    <input
                      name="pinNumber"
                      required
                      type="password"
                      placeholder="Enter your PIN"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer">
                    Cash Out
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

       
      </div>
       {/* Transaction History */}
       <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-gray-500 mb-4">Your last 100 transactions</p>
          <TransctionPage filteredTransactions={filteredTransactions} />
        </div>
    </div>
  );
}
