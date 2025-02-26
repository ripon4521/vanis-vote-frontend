import { useState } from "react";
import { Link } from "react-router-dom";

const TransctionTable = ({transactionsData}) => {
    // console.log(transactionsData)
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredTransactions = transactionsData?.filter((transaction) => {
    const matchesSearch =
      transaction.senderId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.senderId.mobile.includes(searchTerm) ||
      transaction.receiverNumber.includes(searchTerm) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "All" || transaction.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          placeholder="Search by name, mobile, or transaction ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered max-w-sm w-full"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="select select-bordered max-w-[180px] w-full"
        >
          <option value="All">All Types</option>
          <option value="SendMoney">Send Money</option>
          <option value="CashIn">Cash In</option>
          <option value="CashOut">Cash Out</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full table-auto">
          <thead>
            <tr className="text-left">
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Fee</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Transaction ID</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                <td>{transaction.type}</td>
                <td>৳{transaction.amount.toFixed(2)}</td>
                <td>৳{transaction.fee.toFixed(2)}</td>
                <td>{transaction.senderId.name}</td>
                <td>{transaction.receiver?.name || transaction.receiverNumber}</td>
              
                <td className="font-mono">{transaction.transactionId}</td>
                <td className="cursor-pointer text-blue-500 hover:underline"><Link to={`/admin-dashboard/transction-details/${transaction?._id}`}>view details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransctionTable;
