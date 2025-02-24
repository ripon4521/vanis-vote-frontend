import { Navigate, useLocation } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Loader from "../Components/Loader";

const AgentPrivate = ({ children }) => {
    const { profile, isLoading } = useUser();
    const location = useLocation();

    // Show loader while user data is loading
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader/>
        </div>;
    }

    // If not logged in, redirect to login
    if (!profile) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // If user is not admin, block access and redirect (e.g., to home or unauthorized page)
    if (profile.accountType !== "agent") {
        return <Navigate to="/unauthorized" replace />;
    }

    // If user is admin, allow access
    return children;
};

export default AgentPrivate;
