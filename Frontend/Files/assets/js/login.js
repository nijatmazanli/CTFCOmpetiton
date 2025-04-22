document.addEventListener('DOMContentLoaded', () => {
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const checkLogin = login => {
        const decTok = localStorage.getItem('token') || "empty"
        if (decTok){
            console.log(decTok);
            const dexoded = parseJwt(decTok)
            const now = Math.floor(Date.now() / 1000); // Current time in seconds
            console.log(dexoded, now)
            if (decTok && dexoded.exp !== now) {
                alert("You have an active token. After closing this alert, you will be redirected to the main page.");
                window.location.href = "/";
            }
        }
    }
    checkLogin();
    const form = document.getElementById('login-form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    console.log(username.value);
    console.log(password.value);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            username: username.value,
            password: password.value,
            userAgent: navigator.userAgent
        };
        console.log(userData);
        await axios.post('/login', userData).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            console.log(parseJwt(response.data.token));
        }).catch((error) => {
            console.log(error);
        })
    });
});
