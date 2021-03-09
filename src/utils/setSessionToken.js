import {useCookies} from "react-cookie";
import setAuthHeader from "./setAuthHeader";

export default token => {
    const [cookies, setCookie, removeCookie] = useCookies();
    setCookie('user_jwt', token, {sameSite: "lax"}); //secure: true, httpOnly: true
    localStorage.setItem('token', token)
    setAuthHeader(token);
};
