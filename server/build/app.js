"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const tests_1 = __importDefault(require("./routes/tests"));
const cors_1 = __importDefault(require("./utils/cors"));
const mailer_1 = __importDefault(require("./routes/mailer"));
const server = (0, express_1.default)();
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
const port = 3000;
server.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(body_parser_1.default.json({ limit: '50mb' }));
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)('dev'));
server.use('/tests', tests_1.default);
server.use('/send-email', mailer_1.default);
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
const serverMessage = `Server on http://localhost:${port}`;
server.listen(port, () => {
    console.log(serverMessage);
});
