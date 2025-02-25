import { User } from "lucide-react";
import useUser from "../../Hooks/useUser";
import { useNavigate } from "react-router-dom";

export function Header() {
    const { profile, refetch } = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
    
      localStorage.removeItem("token");
  

      refetch();
      navigate("/");
   
      window.location.reload();
  
     
    
  }
  
    return (
        <header className="">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="relative group">
                    <button className="p-2 rounded-full hover:bg-gray-200 bg-emerald-200">
                        <User className="" />
                        <span className="sr-only">Open user menu</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-4 py-2 font-semibold border-b">{profile?.name}</div>
                        <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Type: <span className="text-red-500 uppercase">{profile?.accountType}</span></a>
                        <div className="border-t"></div>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
