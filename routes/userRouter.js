import express from 'express';
import { prisma } from '../server.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.send({ success: true, users });
    } catch (error) {
        res.send({ success: false, error: error.message });
    }
});

userRouter.post(`/register`, async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.send({
                success: false,
                error: "You must provide a username and password when logging in.",
            });
        }
        const checkUser = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (checkUser) {
            return res.send({
                success: false,
                error: "User already exists",
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.send({
            success: true,
            token
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});
