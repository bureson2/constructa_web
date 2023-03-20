import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({children, ...rest}) => {
    const token = sessionStorage.getItem('token');
    return(
        // todo return login
        token ? <Outlet /> : <Navigate to="/tasks" />
    )
}

export default PrivateRoutes;