import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
// Security packages
import helmet from "helmet";
import dbConnection from "./dbConfig/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";

const __dirname = path.resolve(path.dirname(""));

dotenv.config();

const app = express();

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, "views/build")));

const PORT = process.env.PORT || 8080;

dbConnection();

app.use(helmet());
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Mount your router
app.use(router);

// Error handling middleware should be the last one
app.use(errorMiddleware);
// const allowCrossDomain = (req, res, next) => {
//   res.header(`Access-Control-Allow-Origin`, `example.com`);
//   res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//   res.header(`Access-Control-Allow-Headers`, `Content-Type`);
//   next();
// };

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
