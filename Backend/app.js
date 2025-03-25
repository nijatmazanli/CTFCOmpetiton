const express = require('express');
const app = express();
const port = 3001

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000/" }));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log('Express app listening on port ' + port);

})