import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage';
import { LINK_PATHS } from '../utils/constant';

export function PrivateRoute({ children }: PropsWithChildren) {
    const [isLoggedIn] = useLocalStorage<boolean>('user-logged-in', false);
    const location = useLocation()

    return !isLoggedIn ? (
        <Navigate
            state={{ from: location.pathname }}
            to={(() => { }, LINK_PATHS.signin.path)}
        />
    ) : (
        children
    )
}
