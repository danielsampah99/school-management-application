import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import UserLogin from "./routes/UserLogin";
import userRegistration from "./routes/userRegistration";
import user from "./routes/user";
import adminLogin from "./routes/adminLogin";
import courses from "./routes/courses";
import students from "./routes/students";
import rateLimiter from "./middleware/rateLimiter";
import { createLogger, format, transports } from "winston";

const app = express();
const PORT: string | undefined = process.env.PORT;
const MONGDB_URL = process.env.MONGDB_URL;

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(MONGDB_URL!);
		console.log(`connected to MONGODB`);
	} catch (error) {
		console.log(error);
	}
};

connectToMongoDB();

// TO DO: ADMIN BACKEND LOGIN VALIDATION

const logger = createLogger({
	level: "verbose",
	transports: [
		new transports.Console(),
		new transports.File({ filename: "Combined log", level: 'info' }),
	],
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.json(),
		format.prettyPrint(),
		format.printf(({ timestamp, level, message }) => {
			return `${timestamp} ${level}: ${message}`
		})
	),
});

app.use(cors({ exposedHeaders: "x-auth-token" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.use("/api/login", UserLogin);
app.use("/api/adminlogin", adminLogin);
app.use("/api/register", userRegistration);
app.use("/api/users", user);
app.use("/api/courses", courses);
app.use("/api/students", students);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
