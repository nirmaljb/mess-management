const logoutDiv = document.getElementById("logout");

logoutDiv.addEventListener("click", () => {
    user_logout();
});

function user_logout() {
    localStorage.removeItem("enrollment_no");
    localStorage.removeItem("fullname");
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

(() => {
    if(!localStorage.getItem('token')) {
        user_logout();
    }
})();

