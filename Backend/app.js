const express = require('express');
const app = express();
require('dotenv').config({path: '/home/prime/WebstormProjects/untitled2/.env'});
app.set('trust proxy', true);

const jwt = require("jsonwebtoken");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://ctfadmin:7rLI7rgUdqiaH5yb@ctfcluster.thvyy.mongodb.net/?appName=CTFCluster";

const port = process.env.BACKEND_PORT || 3001;
const secretKey = "yourSecretKey";  // Use a more secure way to store this, e.g., in environment variables.
const username = process.env.CTF_USERNAME;
const password = process.env.CTF_PASSWORD;


const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

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
app.use(cors);
app.use(express.json());

if (cluster.isMaster) {
    console.log(`🧠 Master ${process.pid} is running`);

    // Fork a worker for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Optional: Restart dead workers
    cluster.on('exit', (worker, code, signal) => {
        console.log(`💀 Worker ${worker.process.pid} died. Spawning a new one...`);
        cluster.fork();
    });

} else {



    app.post(
        "/login",
        [
            // Validate & sanitize input
            body("username").trim().escape().notEmpty().withMessage("Username is required"),
            body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
        ],
        async (req, res) => {
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            } else {
                if (username === req.body.username && password === req.body.password) {
                    try {
                        const user = {
                            ip: req.body.ip,
                            userAgent: req.body.userAgent,
                            password: req.body.password,
                            username: req.body.username,
                        }
                        console.log(user);
                        const result = await db.collection("users").insertOne(user);
                        console.log(result);
                        const token = jwt.sign({user},process.env.SECRET, {expiresIn: "1h"});
                        console.log(token)
                        const respData ={
                            token:token,
                            username: req.body.username,
                        }
                        res.status(200).send(respData);
                    } catch (error) {
                        console.log(error);
                    }
                }
                else{
                    return res.status(400).json({statusMessage: "Erroor"});
                }
            }
        }
    )


    app.listen(port, () => {
        console.log('Express app listening on port ' + port);

    })
}