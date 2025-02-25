/* eslint-disable react/prop-types */


const TransctionPage = ({ filteredTransactions }) => {

  // Ensure transactionsData is always an array
  const transactionsArray = Array.isArray(filteredTransactions)
    ? filteredTransactions
    : [filteredTransactions];

  return (
    <div className="">
   
      <div className="overflow-x-auto">
        {transactionsArray.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Fee</th>
                <th className="py-2 px-4 border-b">Sender</th>
                <th className="py-2 px-4 border-b">Receiver</th>
                <th className="py-2 px-4 border-b">Transaction ID</th>
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
