import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({children, ...rest}) => {
    const token = sessionStorage.getItem('token');
    return(
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;