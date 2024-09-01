import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
interface jwtPayload {
    id: number
}
export async function authMiddleware(req: any, res: any, next: any) {

    try {
        const token = req.header("Authorization")?.replace('Bearer ', '');
        console.log("|" + token + "|")

        console.log(req.id)
        if (!token) {
            return res.status(401).json({ error: "UnAuthorized" });
        }
        //typescript doesnt know the return type of decoded 
        const secretKey: any = process.env.SECRET_KEY;
        const decoded = jwt.verify(token,
            secretKey) as jwtPayload
        // console.log(decoded)
        req.id = decoded.id;
        next();

    }
    catch (error) {
        res.status(401).json({ error });
    }

}