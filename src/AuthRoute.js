import { Navigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage")


function AuthRoute ({children}) {
    const accessToken =  localStorage.getItem('accessToken') || ''

    if (!accessToken) {
        return <Navigate to="/login"/>
    }
    return children
}

function AuthNotRoute ({children}) {
    const accessToken =  localStorage.getItem('accessToken') || ''

    if (accessToken) {
        return <Navigate to="/dashboard"/>
    }
    return children
}

export{
    AuthRoute,
    AuthNotRoute
};