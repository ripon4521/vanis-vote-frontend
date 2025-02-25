import { User, Bell } from "lucide-react";
import useUser from "../../Hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useTransaction from "../../Hooks/useTansction";

export function Header() {
    const { profile, refetch } = useUser();
    const navigate = useNavigate();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notification, setNotification] = useState();
    const [transactions] = useTransaction(profile?.mobile, profile?._id);
    const transactionsData = transactions?.data;
    const filteredTransactions = transactionsData?.filter(
        (tran) =>
            tran?.receiverNumber === profile?.mobile
    );
    const sorted = filteredTransactions?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const handleLogout = () => {
        localStorage.removeItem("token");
        refetch();
        navigate("/");
        window.location.reload();
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <header className="">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {sorted && sorted.length > 0 && (
                    <marquee className="border-green-400 text-green-700 rounded-lg animate-bounce">
                        {`${sorted[0]?.type}  ৳${sorted[0]?.amount} from ${sorted[0]?.senderId?.mobile}`}
                    </marquee>
                )}
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="p-2 rounded-full hover:bg-gray-200 bg-emerald-200">
                            <User />
                            <span className="sr-only">Open user menu</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="px-4 py-2 font-semibold border-b">{profile?.name}</div>
                            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Type: <span className="text-red-500 uppercase">{profile?.accountType}</span></a>
                            <div className="border-t"></div>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                        </div>
                    </div>

                    <div className="relative">
                        <button onClick={toggleNotification} className="p-2 rounded-full hover:bg-gray-200 bg-emerald-200">
                            <Bell />
                            <span className="sr-only">Open notifications</span>
                        </button>
                        {isNotificationOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10">
                                <div className="px-4 py-2 font-semibold border-b">Notifications</div>
                                <div className="max-h-48 overflow-y-auto">
                                    {sorted?.length > 0 ? (
                                        sorted?.map((notif) => (
                                            <div key={notif._id} className="p-2 border-b text-gray-700">
                                                💸 {notif.senderId.mobile} {notif.type} ৳{notif.amount}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-gray-500">No notifications found</div>
                                    )}
                                </div>
                                <div className="border-t"></div>
                                <button onClick={toggleNotification} className="w-full text-center px-4 py-2 hover:bg-gray-100">Close</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
