import { useState } from 'react';
import useUser from '../../Hooks/useUser';
import Header from '../Header/Header';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('cash-in');
  const [showBalance, setShowBalance] = useState(false);
  const { profile, refetch } = useUser();
  console.log(profile)

  const handleShowBalance = () => {
    setShowBalance(true);
    setTimeout(() => {
      setShowBalance(false);
    }, 5000);
  };







  return (
    <div className="max-w-6xl mx-auto py-10">
             <Header/>
      <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>
      <div className="grid gap-6">
        <div className="border border-gray-200 rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Balance</h2>
            <p className="text-sm text-gray-500">Click to reveal your balance and income</p>
          </div>
          {showBalance ? (
            <p className="text-lg font-semibold">$1000 (Example Balance)</p>
          ) : (
            <button className="w-full border  border-gray-200 cursor-pointer rounded-lg py-2 hover:bg-gray-100" onClick={handleShowBalance}>
              Show Balance and Income
            </button>
          )}
        </div>
        {
            profile?.isApproved ?  <div>
            <div className="flex space-x-2 mb-4">
              <button
                className={`flex-1 border-gray-200 border rounded-lg py-2 hover:cursor-pointer  ${activeTab === 'cash-in' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('cash-in')}
              >
                Cash In
              </button>
              <button
                className={`flex-1 border-gray-200 border rounded-lg py-2 hover:cursor-pointer ${activeTab === 'balance-recharge' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('balance-recharge')}
              >
                Balance Recharge
              </button>
              <button
                className={`flex-1 border-gray-200 border rounded-lg py-2 hover:cursor-pointer ${activeTab === 'withdraw' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('withdraw')}
              >
                Withdraw
              </button>
            </div>
  
            {activeTab === 'cash-in' && (
              <div className="border border-gray-200 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Cash In</h2>
                <p className="text-sm text-gray-500 mb-4">Process cash in for users</p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="user" className="block text-sm font-medium">User Number</label>
                    <input id="user" className="w-full border border-gray-200  rounded-lg p-2" placeholder="Enter user's number" />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
                    <input id="amount" type="number" className="w-full border border-gray-200  rounded-lg p-2" placeholder="Enter amount" />
                  </div>
                  <div>
                    <label htmlFor="pin" className="block text-sm font-medium">Agent PIN</label>
                    <input id="pin" type="password" className="w-full border border-gray-200  rounded-lg p-2" placeholder="Enter your PIN" />
                  </div>
                </div>
                <button className="w-full mt-4 border border-gray-200  cursor-pointer rounded-lg py-2 hover:bg-gray-100">Process Cash In</button>
              </div>
            )}
  
            {activeTab === 'balance-recharge' && (
              <div className="border border-gray-200  rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Balance Recharge Request</h2>
                <p className="text-sm text-gray-500 mb-4">Request a balance recharge from admin</p>
                <div>
                  <label htmlFor="recharge-amount" className="block text-sm font-medium">Amount</label>
                  <input id="recharge-amount" type="number" className="w-full border-gray-200   border rounded-lg p-2" placeholder="Enter amount" />
                </div>
                <button className="w-full mt-4 border border-gray-200 cursor-pointer rounded-lg py-2 hover:bg-gray-100">Send Recharge Request</button>
              </div>
            )}
  
            {activeTab === 'withdraw' && (
              <div className="border border-gray-200  rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Withdraw Request</h2>
                <p className="text-sm text-gray-500 mb-4">Request to withdraw from your income</p>
                <div>
                  <label htmlFor="withdraw-amount" className="block text-sm font-medium">Amount</label>
                  <input id="withdraw-amount" type="number" className="w-full border-gray-200  border rounded-lg p-2" placeholder="Enter amount" />
                </div>
                <button className="w-full mt-4 border border-gray-200 cursor-pointer rounded-lg py-2 hover:bg-gray-100">Send Withdraw Request</button>
              </div>
            )}
          </div> : <h1>Wait for agent approval</h1>
        }

       

        <div className="border rounded-lg shadow p-6 border-gray-200 ">
          <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
          <p className="text-sm text-gray-500 mb-4">Your last 100 transactions</p>
          <p>Transaction history will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
