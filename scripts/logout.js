const logoutDiv = document.getElementById("logout");

logoutDiv.addEventListener("click", () => {
    localStorage.removeItem("enrollment_no");
    localStorage.removeItem("fullname");
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

function logout() {
    // Clear any stored authentication tokens or user data
    localStorage.removeItem('token_admin');
    // Redirect to login page
    window.location.href = '/admin/pages/login.html';
}
