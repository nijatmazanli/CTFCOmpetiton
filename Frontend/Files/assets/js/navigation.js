const navHome = document.getElementById('navHome');
const navAbout = document.getElementById('navAbout');
const navLogin = document.getElementById('navLogin');
const login = document.getElementById('login');

navHome.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/"){
        console.log("Redirecting to home");
        window.location.href = "/"
    }
})

navLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/login"){
        console.log("Redirecting to login");
        window.location.href = "/login"
    }
})

navAbout.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/about"){
        console.log(window.location.pathname);
        window.location.href = "/about"
    }
})

login.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/login"){
        console.log(window.location.pathname);
        window.location.href = "/login"

    }
})