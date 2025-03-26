const express = require('express');
const path = require("node:path");
const port = 3000;
const axios = require("axios");

const app = express();
app.use(express.static(path.join(__dirname,"./Files/")));
app.use(express.json());

app.get('*', (req, res) => {
    console.log('Hello World!');
    console.log(req.url, req.ip);
    const randomCode = Math.floor(Math.random() * (599 - 100 + 1)) + 100; // Random status from 100-599
    console.log(`Random response for ${req.url}: ${randomCode}`);
    // res.status(randomCode).send(`Error ${randomCode}`);
    // res.status(200).sendFile(path.join(__dirname+'/Files/index.html'));
    res.status(randomCode).send(`
        <html>
        <head><title>Index of </title></head>
        <body>
        <h1>Index of /${req.url + " " + req.url}/${randomCode * 23}</h1><hr><pre>
        <a href="DontUseAutomaticScanners/">dashboard/</a>        01-Jan-1970 00:00  
        <a href="OrUseThemCleverly/">config/</a>              01-Jan-1970 00:00  
        </pre><hr>
        </body></html>
    `);
})

app.post('/register', async (req, res) => {
    console.log(req.body, req.ip, req.url);
    const newUser = await axios.post("http://localhost:3001/register/", {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }).then((response) => {
        console.log(response);
        res.status(200).send(response.data);

    }).catch((err) => {
        console.log(err);
    });

})
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})