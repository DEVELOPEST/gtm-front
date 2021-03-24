import setAuthHeader from "./setAuthHeader";

export default (token: string) => {
    document.cookie = "jwt=" + token + "; expires=" + new Date(new Date().getTime() + 300 * 1000) +"; path=/; SameSite=Lax;";
    localStorage.setItem('token', token)
    setAuthHeader(token);
};
