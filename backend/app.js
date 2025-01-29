require("dotenv").config();
const employerRouter = require("./routes/employer");
const employeeRouter = require("./routes/Employee");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");

//!middleware
app.use(express.json());

//! CORS middleware
app.use(cors());

//!routes
app.use("/api/", employerRouter);
app.use("/api/", employeeRouter);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://hire-up-xi.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// !Port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to DB");
    app.listen(port, console.log("server listening in port 5000"));
  } catch (err) {
    console.log(err);
  }
};

start();
