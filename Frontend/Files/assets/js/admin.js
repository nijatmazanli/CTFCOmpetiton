const body = document.body; // or: document.getElementById("body")

body.innerHTML = ``
for (let i = 0; i < 10; i++) {
    const d = document.createElement("p");
    d.textContent = i;
    body.appendChild(d);
}