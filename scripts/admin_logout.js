(() => {
    if(!localStorage.getItem('token_admin')) {
        logout();
    }
})();

function logout() {
    localStorage.removeItem('token_admin');
    window.location.href = '/admin/pages/login.html';
}

