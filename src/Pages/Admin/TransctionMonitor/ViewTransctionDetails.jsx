import useTransaction from "../../../Hooks/useTansction";
import { Link, useParams } from "react-router-dom";

export default function ViewTransactionDetails() {
  const { id } = useParams(); // Get transaction ID from URL params
  const [transactions] = useTransaction();
  const transactionsData = transactions?.data || [];


  // Find the specific transaction by ID
  const transaction = transactionsData.find((t) => t._id === id);
//   console.log(transaction)

  if (!transaction) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-500">Transaction Not Found</h1>
        <p className="text-gray-600 mb-5">The transaction you are looking for does not exist.</p>
        <Link to={'/admin-dashboard'} className="bg-green-500 text-white px-2 py-2 rounded-md mt-4">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Transaction Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Transaction ID: {transaction.transactionId}</h2>
          <p className="text-sm text-gray-500">Type: {transaction.type}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold">Amount:</p>
            <p>৳{transaction.amount.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">Fee:</p>
            <p>৳{transaction.fee.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">Date:</p>
            <p>{new Date(transaction.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p>Completed</p>
          </div>
          <div>
            <p className="font-semibold">Sender:</p>
            <p>
              {transaction.senderId.name} ({transaction.senderId.mobile})
            </p>
          </div>
          <div>
            <p className="font-semibold">Receiver:</p>
            <p>{transaction.receiver?.name || transaction.receiverNumber}</p>
          </div>
          
        </div>
        
      </div>
     <div className="flex justify-center">
     <Link to={'/admin-dashboard'} className="bg-green-500 text-white px-2 py-2 rounded-md mt-4">Go Back</Link>
     </div>
    </div>
  );
}
