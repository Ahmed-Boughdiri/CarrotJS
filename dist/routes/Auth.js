"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ValidateData_1 = __importDefault(require("../util/ValidateData"));
var route = express_1.default.Router();
route.get("/register", ValidateData_1.default, function (req, res) {
    return res.send("Working Correctly ...");
});
exports.default = route;
