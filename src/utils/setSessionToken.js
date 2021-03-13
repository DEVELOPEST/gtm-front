import setAuthHeader from "./setAuthHeader";

export default token => {
    document.cookie = "jwt_token=" + token + "; expires=" + new Date(new Date().getTime() + 300 * 1000) +"; path=/";
    localStorage.setItem('token', token)
    setAuthHeader(token);
};
