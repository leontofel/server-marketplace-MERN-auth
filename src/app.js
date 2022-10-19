import express from "express";
import db from './config/dbConnect.js';
import routes from './routes/index.js'
import cors from 'cors';


db.on("error", console.log.bind(console, 'Connection Error'));
db.once("open", () => {
    console.log("Connection with database established");
});

const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());

routes(app);


export default app;