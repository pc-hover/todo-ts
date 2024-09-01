"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./auth");
const routes_1 = require("./routes");
const authMiddleware_1 = require("./authMiddleware");
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//public
app.use("/", auth_1.authRouter);
//private
app.use("/user", authMiddleware_1.authMiddleware, routes_1.router);
app.listen(port, () => {
    console.log(`App running at ${port}`);
});
