import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import UserLogin from "./routes/UserLogin";
import userRegistration from "./routes/userRegistration";
import user from "./routes/user";
import adminLogin from "./routes/adminLogin";

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

app.use(cors({ exposedHeaders: "x-auth-token" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", UserLogin);
app.use("/api/adminlogin", adminLogin);
app.use("/api/register", userRegistration);
app.use("/api/users", user);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
