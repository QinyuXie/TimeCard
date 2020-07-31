export function getToken() {
    return localStorage.getItem('django_auth_token');
}

export function setToken(token) {
    localStorage.setItem("django_auth_token", token);
}

export function clearToken() {
    localStorage.removeItem("django_auth_token");
}

export function isLogined() {
    if (localStorage.getItem("django_auth_token")) {
        return true;
    }
    return false;
}