import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const ProtectedRoute =({children, requiredRole}) => {
    const {isAuthenticated, user } = useContext(AuthContext);

    if(!isAuthenticated){
        return <Navigate to ="/" replace /> 
    }

    if(requiredRole && user.role !== requiredRole) {
        if(user.role === 'admin') {
            return <Navigate to ="/admin/dashboard" replace/>

        }else if(user.role ==="customer") {
            return <Navigate to = "/customer/dashboard" replace/>
        }
    }
    return children;

}

export default ProtectedRoute;