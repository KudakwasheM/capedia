import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import colors from "colors";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import fundRoutes from "./routes/fundRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import projectDetailRoutes from "./routes/projectDetailRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import enterpreneurRoutes from "./routes/enterpreneurRoutes.js";
import investorDetailsRoutes from "./routes/investorDetailsRoutes.js";
import projectDocumentRoutes from "./routes/projectDocumentRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

// const port = process.env.PORT || 5000;
const port = 8000;

connectDB();

const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
// app.use(fileUpload());
app.use(
  cors({
    origin: "*",
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/details", projectDetailRoutes);
app.use("/api/members", teamMemberRoutes);
app.use("/api/testimonials", testimonialRoutes);
// app.use("/api/users/image", profileRoutes);
app.use("/api/enterpreneur", enterpreneurRoutes);
app.use("/api/investors/details", investorDetailsRoutes);
app.use("/api/documents", projectDocumentRoutes);
app.use("/api/test", testRoutes);
// app.use("/api/images");

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on localhost:${port}`.white)
);
