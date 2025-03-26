const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async event => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    const newUser = {
        email: email,
        password: password,
        username: username
    }

    await axios.post("/register", newUser).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
})