import {useCookies} from "react-cookie";
import setAuthHeader from "./setAuthHeader";

export default token => {
    const [cookies, setCookie, removeCookie] = useCookies();
    console.log("Set cookie")
    setCookie('user_jwt', token, {
        sameSite: 'lax',
        httpOnly: false,
        expires: new Date(new Date().getTime() + 300 * 1000),
        path: '/'
    });
    localStorage.setItem('token', token)
    setAuthHeader(token);
};
