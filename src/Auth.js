import decode from "jwt-decode";
import {Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import React from "react";
import {ADMIN, LECTURER, USER} from "./constants";


export const logout = () => {
    document.cookie="jwt=; Max-Age=0; Path=/;";
    localStorage.removeItem('token')
    window.location.reload(true);
}

export const isValidToken = token => {
    if (!token) {
        return false
    }
    try {
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

export const hasAnyRole = checkRoles => {
    const token = localStorage.getItem('token');
    if (isValidToken(token)) {
        const { roles } = decode(token);
        for (var i = 0; i < checkRoles.length; i++) {
            if (roles.indexOf(checkRoles[i]) >= 0){
                return true;
            }
        }
    }
    return false;
}


export const UserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([USER]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)

export const AnyUserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([USER, LECTURER, ADMIN]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)

export const LecturerRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([LECTURER]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)

export const NonUserRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([USER, LECTURER, ADMIN]) ? (
            <Redirect to={{pathname: '/dashboard'}}/>
        ) : (
            <Component {...props} />
        )
    )}/>
)

export const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        hasAnyRole([ADMIN]) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login'}}/>
        )
    )}/>
)
