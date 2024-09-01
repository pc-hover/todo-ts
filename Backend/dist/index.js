"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = findUser;
exports.createUser = createUser;
exports.createTodo = createTodo;
exports.getTodosAndUser = getTodosAndUser;
exports.updateTodo = updateTodo;
exports.SignUp = SignUp;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function findUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: { username }
        });
        if (!user) {
            console.log("User does not exists");
        }
        return user;
    });
}
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //find isf already exists
        const response = yield prisma.user.findFirst({
            where: { username: data.username }
        });
        if (response) {
            console.log("User Already Exists");
            return { error: "Already Exists" };
        }
        // console.log(response)//null
        const newUser = yield prisma.user.create({ data });
        console.log(newUser);
        const secretKey = process.env.SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, secretKey, {
            expiresIn: "1hr"
        });
        console.log(token);
        return { "newUser": newUser, "token": token };
    });
}
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield prisma.todo.create({
            data: {
                title,
                description,
                userId
            }
        });
        console.log(todo);
        return todo;
    });
}
function getTodosAndUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId
            },
            select: {
                title: true,
                description: true,
                done: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });
        // todos.map((e) => {
        //     console.log(e.title);
        //     console.log(e.description);
        // })
        return todos;
    });
}
function updateTodo(id, userId, title, description, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todo.update({
            data: {
                title,
                description,
                done
            },
            where: { id, userId },
        });
        console.log(response);
        return response;
    });
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
function SignUp() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
