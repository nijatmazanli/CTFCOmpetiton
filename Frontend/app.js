const express = require('express');
const path = require("node:path");
const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname,"./Files/")));
app.use(express.json());

app.get('*', (req, res) => {
    console.log('Hello World!');
    console.log(req.url, req.ip);
    res.status(200)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})