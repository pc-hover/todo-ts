import { PrismaClient } from "@prisma/client";
import { join } from "path";
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();
type userData = {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
}
import dotenv from "dotenv"
dotenv.config();


export async function findUser(username: string, password: string) {
    const user = await prisma.user.findFirst({
        where: { username }
    })
    if (!user) {
        console.log("User does not exists");
    }
    return user;
}
export async function createUser(data: userData) {
    //find isf already exists
    const response = await prisma.user.findFirst({
        where: { username: data.username }
    })
    if (response) {
        console.log("User Already Exists");
        return { error: "Already Exists" };
    }
    // console.log(response)//null
    const newUser = await prisma.user.create({ data })
    console.log(newUser)

    const secretKey: any = process.env.SECRET_KEY
    const token = jwt.sign({ id: newUser.id }, secretKey, {
        expiresIn: "1hr"
    })
    console.log(token);
    return { "newUser": newUser, "token": token }
}
export async function createTodo(userId: number, title: string, description: string) {
    const todo = await prisma.todo.create({
        data: {
            title,
            description,
            userId
        }
    })
    console.log(todo);
    return todo;
}
export async function getTodosAndUser(userId: number) {

    const todos = await prisma.todo.findMany({
        where: {
            userId: userId
        },
        select: {
            title: true,
            description: true,
            done: true
            , user: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })

    // todos.map((e) => {
    //     console.log(e.title);
    //     console.log(e.description);
    // })
    return todos;
}
export async function updateTodo(id: number, userId: number, title?: string, description?: string, done?: boolean) {

    const response = await prisma.todo.update({
        data: {
            title,
            description,
            done
        },
        where: { id, userId },
    })
    console.log(response);
    return response;
}
// createUser({
//     username: "priyaewnshu21@123gmail.com",
//     password: "12345",
//     firstName: "1Priyanshu",
//     lastName: "1Choudhary",
// })
// createTodo(1, "Health", "Running is very important");
// createTodo(1, "Health", "Swimming");
// createTodo(1, "Health", "Badminton");
// createTodo(1, "Health", "Chest Press");
// getTodosAndUser(1);
// const data = {
//     id: 1,
//     description: "start programming",
//     done: true
// }
// updateTodo(1, undefined, "hello", true);

// export { createTodo, createUser, getTodosAndUser, updateTodo };

export async function SignUp() {

}