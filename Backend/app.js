const express = require('express');
const app = express();

const jwt = require("jsonwebtoken");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://ctfadmin:7rLI7rgUdqiaH5yb@ctfcluster.thvyy.mongodb.net/?appName=CTFCluster";

const port = 3001
const secretKey = "yourSecretKey";  // Use a more secure way to store this, e.g., in environment variables.


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let db;

async function run() {
    try {
        await client.connect();
        db = client.db("ctfUsers"); // Set the global `db` variable
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

run()


const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000/" }));
app.use(express.json());


app.post(
    "/register",
    [
        // Validate & sanitize input
        body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
        body("username").trim().escape().notEmpty().withMessage("Username is required"),
        body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            console.log(req.body, req.ip, req.url);

            try {

                const {email, username, password} = req.body;

                const chUser = await db.collection("users").findOne(
                    {$or: [{email}, {username}]}, // Check both email and username
                    {projection: {password: 0}}
                );
                if (chUser) {
                    console.log(chUser._id);
                    return res.status(400).send({error: "Email or user already exists"});
                }
                const user = {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username,
                }
                user.password = await bcrypt.hash(user.password, 10);
                const result = await db.collection("users").insertOne(user);
                console.log(result);
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
            }
        }
})

app.post("/login", [body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
        body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long")],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        }
        const token = jwt.sign({userId: result.insertedId, email, username}, secretKey, {expiresIn: "1h"});

    }
)


app.listen(port, () => {
    console.log('Express app listening on port ' + port);

})