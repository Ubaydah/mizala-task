import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from "http";
import morgan from "morgan";
import connectDB from "./src/database.js/connection.js";
import routes from "./src/routes/route.js"
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

//MongoDb connection
connectDB();

//log requests
app.use(morgan('tiny'));

//parse requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//load routes
app.use(routes)

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(
        `server running on http://localhost:${PORT}`
    );
});