import decode from "jwt-decode";
import {Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {ADMIN, LECTURER, USER} from "./constants";


export const logout = () => {
    document.cookie="jwt=; Max-Age=0; Path=/;";
    localStorage.removeItem('token')
    window.location.reload(true);
}

export const isValidToken = (token: string | null) => {
    if (!token) {
        return false
    }
    try {
        // @ts-ignore
        const { exp } = decode(token);
        if (exp < new Date().getTime() / 1000 ) {
            logout()
            return false
        }
    } catch (e) {
        return false
    }
    return true
}

export const getUsernameFromToken = () => {
    const token: string | null = localStorage.getItem('token');
    if (isValidToken(token)) {
        // @ts-ignore
        const { username } = decode(token);
        return username;
    }
    return '';
}

export const hasAnyRole = (checkRoles: string[]) => {
    const token: string | null = localStorage.getItem('token');
    if (isValidToken(token)) {
        // @ts-ignore
        const { roles } = decode(token);
        for (var i = 0; i < checkRoles.length; i++) {
            if (roles.indexOf(checkRoles[i]) >= 0){
                return true;
            }
        }
    }
    return false;
}


// @ts-ignore
export const UserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([USER]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)

// @ts-ignore
export const AnyUserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([USER, LECTURER, ADMIN]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)

// @ts-ignore
export const LecturerRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([LECTURER]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)

// @ts-ignore
export const NonUserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([USER, LECTURER, ADMIN]) ? (
            <Redirect to={{pathname: '/dashboard'}}/>
        ) : (
            <Component {...props} />
        )
    )}/>
)

// @ts-ignore
export const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([ADMIN]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)
