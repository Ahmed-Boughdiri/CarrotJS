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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ValidateData_1 = __importDefault(require("../util/ValidateData"));
var User_1 = __importDefault(require("../models/User"));
var EmailExists_1 = __importDefault(require("../util/EmailExists"));
var PasswordHashing_1 = __importDefault(require("../util/PasswordHashing"));
var GenToken_1 = __importDefault(require("../util/GenToken"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var route = express_1.default.Router();
// TODO: Working More On The Typescript Types
route.post("/register", ValidateData_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, checkEmailExists, newUser, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body.user, username = _a.username, email = _a.email;
                password = req.body.user.password;
                return [4 /*yield*/, EmailExists_1.default(email)];
            case 1:
                checkEmailExists = _b.sent();
                if (checkEmailExists.exists) {
                    return [2 /*return*/, res.status(400).send({ error: checkEmailExists.error })];
                }
                return [4 /*yield*/, PasswordHashing_1.default(password)];
            case 2:
                password = _b.sent();
                newUser = new User_1.default({
                    username: username,
                    email: email,
                    password: password
                });
                _b.label = 3;
            case 3:
                _b.trys.push([3, 6, , 7]);
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                return [4 /*yield*/, GenToken_1.default(username, email, newUser._id)];
            case 5:
                token = _b.sent();
                return [2 /*return*/, res.status(201).send({
                        username: newUser.username,
                        email: newUser.email,
                        password: newUser.password,
                        id: newUser._id,
                        token: token
                    })];
            case 6:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(400).send({ error: err_1 })];
            case 7: return [2 /*return*/];
        }
    });
}); });
// TODO: Working More On The Typescript Types
route.get("/token/login", function (req, res) {
    var token = req.body.token;
    if (!token)
        return res.status(400).send({ error: "No Token Provided" });
    var validToken = jsonwebtoken_1.default.verify(token, process.env.SECRET || "");
    if (!validToken)
        return res.status(400).send({ error: "Invalid Token" });
    return res.status(200).send({
        username: validToken.username,
        email: validToken.email,
        id: validToken.id,
        token: token
    });
});
// TODO: Giving More Try Catch Blocks
route.get("/login", ValidateData_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, user, validPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body.user, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email, username: username })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: "User Do Not Exists" })];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                validPassword = _b.sent();
                if (!validPassword)
                    return [2 /*return*/, res.status(400).send({ error: "Wrong Password" })];
                return [4 /*yield*/, GenToken_1.default(username, email, user._id)];
            case 3:
                token = _b.sent();
                return [2 /*return*/, res.status(200).send({
                        username: username,
                        email: email,
                        id: user._id,
                        token: token
                    })];
        }
    });
}); });
exports.default = route;
