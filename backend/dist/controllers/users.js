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
exports.logout = exports.login = exports.createUser = exports.getUsers = exports.getAuthenticatedUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().exec();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.getUsers = getUsers;
;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    try {
        if (!username || !email || !passwordRaw) {
            throw (0, http_errors_1.default)(400, "Invalid Parameters Check username or email or password");
        }
        // check duplicate username in our database
        const dupUsername = yield user_1.default.findOne({ username: username }).exec();
        if (dupUsername) {
            throw (0, http_errors_1.default)(409, "username is already exsists");
        }
        // check duplicate email in our database
        const dupEmail = yield user_1.default.findOne({ email: email }).exec();
        if (dupEmail) {
            throw (0, http_errors_1.default)(409, "email is already exsists");
        }
        const hashedPassword = yield bcrypt_1.default.hash(passwordRaw, 10);
        const newUser = yield user_1.default.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof http_errors_1.default.HttpError) {
            res.status(error.statusCode).json({ message: error.message });
            // next(error);
        }
        else {
            next(error);
        }
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            throw (0, http_errors_1.default)(400, "Parameters Missing");
        }
        const user = yield user_1.default.findOne({ username: username }).select("+password +email").exec();
        if (!user) {
            throw (0, http_errors_1.default)(401, "Invalid credentials (username)");
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw (0, http_errors_1.default)(401, "Invalid credentials (Password)");
        }
        req.session.userId = user._id;
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof http_errors_1.default.HttpError) {
            res.status(error.statusCode).json({ message: error.message });
            // next(error);
        }
        else {
            next(error);
        }
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(error => {
        if (error) {
            next(error);
        }
        else {
            res.sendStatus(200);
        }
    });
});
exports.logout = logout;
