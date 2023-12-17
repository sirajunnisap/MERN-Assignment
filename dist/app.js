"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const http_errors_1 = __importDefault(require("http-errors"));
const dbConfig_1 = __importDefault(require("./infra/database/dbConfig"));
const user_1 = __importDefault(require("./interface/route/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '500mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '500mb' }));
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
(0, dbConfig_1.default)(process.env.MONGODB_CONNECTION_URL || '');
app.use('/', user_1.default);
app.use((req, res, next) => {
    res.send(new http_errors_1.default.NotFound());
});
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        status: res.status || 500,
        message: error.message
    });
};
app.use(errorHandler);
const PORT = Number(process.env.PORT) || 4000;
const server = app.listen(4000, () => console.log(`server is running ${PORT}`));