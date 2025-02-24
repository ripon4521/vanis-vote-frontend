import { useState } from "react";

export default function User() {
  const [activeTab, setActiveTab] = useState("send-money");

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid gap-6">

        {/* Balance Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Balance</h2>
          <p className="text-gray-500 mb-4">Click to reveal your balance</p>
          <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Show Balance
          </button>
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient Number</label>
                  <input
                    type="text"
                    placeholder="Enter recipient's number"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PIN</label>
                  <input
                    type="password"
                    placeholder="Enter your PIN"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Send Money
                </button>
              </div>
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
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agent Number</label>
                  <input
                    type="text"
                    placeholder="Enter agent's number"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
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
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agent Number</label>
                  <input
                    type="text"
                    placeholder="Enter agent's number"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PIN</label>
                  <input
                    type="password"
                    placeholder="Enter your PIN"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Cash Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-gray-500 mb-4">Your last 10 transactions</p>
          {/* Replace this with a table or list for transactions */}
          <p className="text-gray-400">Transaction history will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
