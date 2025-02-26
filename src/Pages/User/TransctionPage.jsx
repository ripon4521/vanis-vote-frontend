/* eslint-disable react/prop-types */

const TransctionPage = ({ filteredTransactions }) => {
  // Ensure transactionsData is always an array
  const transactionsArray = Array.isArray(filteredTransactions)
    ? filteredTransactions
    : [filteredTransactions];

  return (
    <div className="px-4 py-6">
      <div className="overflow-x-auto ">
        {transactionsArray.length > 0 ? (
          <table className="table w-full bg-white border border-gray-200 table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-left">Fee</th>
                <th className="py-2 px-4 border-b text-left">Sender</th>
                <th className="py-2 px-4 border-b text-left">Receiver</th>
                <th className="py-2 px-4 border-b text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {transactionsArray.map((transaction) => (
                <tr key={transaction?._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {new Date(transaction?.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{transaction?.type}</td>
                  <td className="py-2 px-4 border-b">
                    ৳{transaction?.amount?.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ৳{transaction?.fee?.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {transaction?.senderId?.mobile || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {transaction?.receiver?.mobile || transaction?.receiverNumber}
                  </td>
                  <td className="py-2 px-4 border-b font-mono">
                    {transaction?.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default TransctionPage;
