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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const _1 = require(".");
const router = (0, express_1.default)();
exports.router = router;
router.use(body_parser_1.default.json());
// const data1 = {
//     username: "sameergmaedeil.com",
//     password: "12345",
//     firstName: "1Priyanshu",
//     lastName: "1Choudhary",
// }
router.post("/createTodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, description } = req.body;
    console.log("this shoulf be userID not id " + userId);
    const response = yield (0, _1.createTodo)(userId, title, description);
    console.log(response);
    return res.status(200).json(response);
}));
router.post("/getTodosAndUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const response = yield (0, _1.getTodosAndUser)(userId);
    console.log(response);
    return res.status(200).json(response);
}));
router.post("/updateTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId, title, description, done } = req.body;
    const response = yield (0, _1.updateTodo)(id, userId, title, description, done);
    console.log(response);
    return res.status(200).json(response);
}));
