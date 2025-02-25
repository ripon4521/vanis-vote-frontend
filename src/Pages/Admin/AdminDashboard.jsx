import { useState } from "react";
import Header from "../Header/Header";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("user-management");

  return (
    <div className="container mx-auto py-10">
             <Header/>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "user-management"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer"
            }`}
            onClick={() => setActiveTab("user-management")}
          >
            User/Agent Management
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "agent-approval"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer"
            }`}
            onClick={() => setActiveTab("agent-approval")}
          >
            Agent Approval
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "transaction-monitoring"
                ? "border-b-2  border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer"
            }`}
            onClick={() => setActiveTab("transaction-monitoring")}
          >
            Transaction Monitoring
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "recharge-withdraw"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 cursor-pointer"
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
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-semibold">
                  Search User/Agent
                </label>
                <input
                  id="search"
                  className="w-full p-2 border border-gray-200 rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Search
              </button>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Phone</th>
                      <th className="py-2 px-4 text-left">Role</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample user data */}
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4">John Doe</td>
                      <td className="py-2 px-4">1234567890</td>
                      <td className="py-2 px-4">User</td>
                      <td className="py-2 px-4">
                        <button className="bg-red-500 text-white py-1 px-3 rounded-md mr-2">
                          Block
                        </button>
                        <button className="bg-green-500 text-white py-1 px-3 rounded-md">
                          Unblock
                        </button>
                      </td>
                    </tr>
                    {/* More rows */}
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
