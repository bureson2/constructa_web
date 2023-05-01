import { Outlet, Navigate } from 'react-router-dom'

/**
 * The PrivateRoutes component is used to verify whether the user has a valid session token.
 * If the token is valid, the user can access secure routes.
 * If the token doesn't exist or is invalid, the user will be redirected to the login page.
 *
 * @param {object} props - The properties of the component
 * @param {React.ReactNode} props.children - The children of the component to be rendered
 * @returns {JSX.Element} - Returns a component with routing for secure pages
 */
const PrivateRoutes = ({children, ...rest}) => {
    const token = sessionStorage.getItem('token');
    return(
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;