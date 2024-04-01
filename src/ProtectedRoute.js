import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useAuth();

    if(loading) return <h1>Loading...</h1>;
    if (!loading && !isAuthenticated){
        return <Navigate to='iniciar-sesion' replace/>
    }

    return <Outlet />;

}

export default ProtectedRoute;