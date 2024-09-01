import express from "express"
import bodyParser from "body-parser"
import { createUser, createTodo, updateTodo, getTodosAndUser } from ".";

const router = express();

router.use(bodyParser.json());

// const data1 = {
//     username: "sameergmaedeil.com",
//     password: "12345",
//     firstName: "1Priyanshu",
//     lastName: "1Choudhary",
// }

router.post("/createTodos", async (req: any, res: any) => {
    const { userId, title, description } = req.body;
    console.log("this shoulf be userID not id " + userId)
    const response = await createTodo(userId, title, description);
    console.log(response);
    return res.status(200).json(response);
})
router.post("/getTodosAndUser", async (req: any, res: any) => {
    const { userId } = req.body;
    const response = await getTodosAndUser(userId);
    console.log(response);
    return res.status(200).json(response);
})
router.post("/updateTodo", async (req: any, res: any) => {
    const { id, userId, title, description, done } = req.body;
    const response = await updateTodo(id, userId, title, description, done);
    console.log(response);
    return res.status(200).json(response);
})

export { router };