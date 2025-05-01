import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({children}) => {
    const { isAuthenticated, loading } = useSelector(state => state.userState);

    if(!isAuthenticated) return <Navigate to={'/login'} />

    if(loading) return <p>Loading..</p>

    return children;
}