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
exports.authRouter = void 0;
//signup
//login
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const _1 = require(".");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _2 = require(".");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.use(body_parser_1.default.json());
authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        data.password = hashedPassword;
        const response = yield (0, _2.createUser)(data);
        console.log(response);
        return res.status(200).json({ "token": response.token, "newUser": response.newUser });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //username //password
    try {
        const { username, password } = req.body;
        const user = yield (0, _1.findUser)(username, password);
        console.log(user);
        if (!user || user === undefined) {
            return res.status(401).json({ error: "Authentication Failed" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Wrong Credentials" });
        }
        const secretKey = process.env.SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, {
            expiresIn: "1hr"
        });
        console.log(token);
        return res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).send({ message: "Login Failed: " + error });
    }
}));
