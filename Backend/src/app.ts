import express from "express"
import bodyParser from "body-parser"
import { authRouter } from "./auth";
import { router } from "./routes";
import { authMiddleware } from "./authMiddleware";
import cors from "cors"

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

//public
app.use("/", authRouter);
//private
app.use("/user", authMiddleware, router)


app.listen(port, () => {
    console.log(`App running at ${port}`);
})
