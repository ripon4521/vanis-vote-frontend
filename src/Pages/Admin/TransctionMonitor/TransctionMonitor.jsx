import useSystemBalance from "../../../Hooks/useSystemBalance";
import useTransaction from "../../../Hooks/useTansction";

const TransctionMonitor = () => {
  const [transactions] = useTransaction();
  const [system_balance] = useSystemBalance();

  // Safely access transactionsData
  const transactionsData = transactions?.data || [];

  // Calculate totalFee and totalAmount only if transactionsData is available
  const totalFee = transactionsData.length > 0 
    ? transactionsData.reduce((sum, transaction) => sum + transaction.fee, 0)
    : 0;

  const totalAmount = transactionsData.length > 0 
    ? transactionsData.reduce((sum, transaction) => sum + transaction.amount, 0)
    : 0;

  const totalTransactions = transactionsData.length;

  // Calculate averageTransaction
  const averageTransaction = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

  // Safely access system_balance
  const totalBalance = system_balance?.data?.[0]?.totalBalance || 0;

//   console.log("Average Transaction Amount:", averageTransaction);

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-sm font-medium">Total Transactions</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalTransactions}</div>
        </div>
      </div>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-sm font-medium">Total System Balance</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">৳ {totalBalance}</div>
        </div>
      </div>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-sm font-medium">Total Fees</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">৳ {totalFee}</div>
        </div>
      </div>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-sm font-medium">Average Transaction</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">৳ {averageTransaction.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default TransctionMonitor;
