document.addEventListener('DOMContentLoaded', () => {

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

        await axios.post('http://localhost:3000/login', userData).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    });
});
