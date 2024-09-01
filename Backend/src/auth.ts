//signup
//login
import express from "express"
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import { findUser } from ".";
import jwt from "jsonwebtoken"
import { createUser } from ".";
import dotenv from "dotenv"

dotenv.config();

const authRouter = express.Router();

authRouter.use(bodyParser.json());

authRouter.post("/register", async (req, res) => {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const response = await createUser(data);
        console.log(response);
        return res.status(200).json({ "token": response.token, "newUser": response.newUser })

    }
    catch (error) {
        res.status(500).json({ message: error })
    }

})
authRouter.post("/login", async (req, res) => {
    //username //password
    try {
        const { username, password } = req.body;
        const user = await findUser(username, password);
        console.log(user);
        if (!user || user === undefined) { return res.status(401).json({ error: "Authentication Failed" }) }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Wrong Credentials" });
        }
        const secretKey: any = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: "1hr"
        })
        console.log(token)
        return res.status(200).json({ user, token })
    }
    catch (error) {
        res.status(500).send({ message: "Login Failed: " + error })
    }
})
export { authRouter }