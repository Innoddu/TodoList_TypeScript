import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

export const getAuthenticatedUser: RequestHandler = async(req, res, next) => {
    console.log("userId:", req.session.userId);
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const getUsers: RequestHandler = async(req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch(error) {
        next(error);
    };
};

interface CreateUserBody {
    username?: string,
    email?: string,
    password?: string,
};

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async(req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Invalid Parameters Check username or email or password");
        } 
        // check duplicate username in our database
        const dupUsername = await UserModel.findOne({ username: username }).exec();
        if (dupUsername) {
            throw createHttpError(409, "username is Already Exsists");
        }

        // check duplicate email in our database
        const dupEmail = await UserModel.findOne({ email: email }).exec();
        if (dupEmail) {
            throw createHttpError(409, "email is Already Exsists");
        }
    
        const hashedPassword = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        req.session.userId = newUser._id;
        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }

};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters Missing");
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec();
        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = async(req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
}