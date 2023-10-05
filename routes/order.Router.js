import express from "express";
import { prisma } from "../server.js";
import jwt from "jsonwebtoken";


export const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                menuItems: true,

            },
        });
        res.send({
            success: true,
            orders,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});

orderRouter.post("/order", async (req, res) => {
    try {
        const { menuItems, status, userId } = req.body;

        // Calculate the total price by summing up the prices of menu items
        const totalPrice = menuItems.reduce((total, menuItem) => total + menuItem.price, 0);

        const order = await prisma.order.create({
            data: {
                status,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                menuItems: {
                    connect: menuItems.map((menuItem) => ({
                        id: menuItem.id,
                    })),
                },
                totalPrice: totalPrice || 0, // Set the total price
            },
            include: {
                user: true,
                menuItems: true,
            },
        });
        res.send({
            success: true,
            order,
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        });
    }
});

