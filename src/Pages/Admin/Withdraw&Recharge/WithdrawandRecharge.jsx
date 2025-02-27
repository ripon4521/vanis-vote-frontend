/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import useAllRecharge from "../../../Hooks/useAllRecharge";
import useGetWithdraw from "../../../Hooks/useGetWithdraw";
import { axiosPublic } from "../../../Hooks/usePublic";
import { toast } from "react-toastify";

export default function WithdrawAndRecharge() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [balance, refetchBalance] = useAllRecharge();
  const [withdraw, refetchWithdraw] = useGetWithdraw();

  const [balanceData, setBalanceData] = useState(balance?.data || []);
  const [withdrawData, setWithdrawData] = useState(withdraw?.data || []);

  useEffect(() => {
    setBalanceData(balance?.data);
    setWithdrawData(withdraw?.data);
  }, [balance?.data, withdraw?.data]);

  const filterRequests = (requests) => {
    return requests?.filter((req) => {
      const matchesSearch =
        req.agentId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.agentId.mobile.includes(searchTerm);
      const matchesStatus = statusFilter === "All" || req.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const updateRequestStatus = (id, isBalanceRequest, status) => {
    const data = { status };
    const requests = [];

    if (isBalanceRequest === true) {
      requests.push(axiosPublic.patch(`/balance/${id}`, data));
    } else {
      requests.push(axiosPublic.patch(`/withdraw/${id}`, data));
    }

    return Promise.all(requests)
      .then(() => {
        toast.success(`${status.charAt(0).toUpperCase() + status.slice(1)} success`);
        if (isBalanceRequest) {
          setBalanceData((prevData) =>
            prevData.map((req) =>
              req._id === id ? { ...req, status } : req
            )
          );
        } else {
          setWithdrawData((prevData) =>
            prevData.map((req) =>
              req._id === id ? { ...req, status } : req
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Something Went Wrong, Please try again");
      });
  };

  const handleApproved = (id, isBalanceRequest) => {
    updateRequestStatus(id, isBalanceRequest, "approved");
  };

  const handleRejected = (id, isBalanceRequest) => {
    updateRequestStatus(id, isBalanceRequest, "rejected");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Balance & Withdraw Requests</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or mobile"
          className="border p-2 rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full sm:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RequestTable title="Balance Requests" requests={filterRequests(balanceData)} handleApproved={handleApproved} handleRejected={handleRejected} />
        <RequestTable title="Withdraw Requests" requests={filterRequests(withdrawData)} handleApproved={handleApproved} handleRejected={handleRejected} />
      </div>
    </div>
  );
}

function RequestTable({ title, requests, handleApproved, handleRejected }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-hidden">
      <h2 className="text-xl font-semibold mb-3 text-center">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Date</th>
              <th className="border p-2">Agent</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests?.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">No requests found</td>
              </tr>
            ) : (
              requests?.map((req) => (
                <tr key={req._id} className="border text-center">
                  <td className="p-2">{new Date(req.createdAt).toLocaleString()}</td>
                  <td className="p-2">{req.agentId.name} ({req.agentId.mobile})</td>
                  <td className="p-2">৳{req.amount.toFixed(2)}</td>
                  <td className="p-2 capitalize">{req.status}</td>
                  <td className="p-2">
                    {req.status === "pending" && (
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <button onClick={() => handleApproved(req._id, req?.isBalanceRequest)} className="bg-green-500 text-white px-2 py-1 rounded text-sm cursor-pointer">Approve</button>
                        <button onClick={() => handleRejected(req._id, req?.isBalanceRequest)} className="bg-red-500 text-white px-2 py-1 rounded text-sm cursor-pointer">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
