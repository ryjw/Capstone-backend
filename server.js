import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { userRouter } from './routes/userRouter.js';
import { orderRouter } from './routes/order.Router.js';
import { menuRouter } from './routes/menuRouter.js';

dotenv.config();
const app = express();
const PORT = 3000;
export const  prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    console.log("hello from middleware")
    try {
        if (!req.headers.authorization) {
            return next();
        }

        const token = req.headers.authorization.split(" ")[1];

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return next();
        }
        delete user.password;
        req.user = user;
        next();
    } catch (error) {
        res.send({ success: false, error: error.message });
    }
});

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/menu", menuRouter);

app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to Capstone Project!"
    });
});


app.use((error, req, res, next) => {
    res.send({
        success: false,
        error: error.message,
    });
});

app.use((req, res) => {
    res.send({
        success: false,
        error: "No route found.",
    });
});



app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}`)
);