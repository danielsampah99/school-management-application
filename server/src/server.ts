import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT: string | undefined = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, ()=> console.log(`listening on http://localhost:${PORT}`));
