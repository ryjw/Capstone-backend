import express from "express";
import { prisma } from "../server.js";

export const menuRouter = express.Router();

menuRouter.post("/menuItem", async (req, res) => {

    try {
        const { name, category, description, price , isKeto , image, isVegan} = req.body
        const menuItem = await prisma.menuItem.create({
            data: {  
                name,
                category,
                description,
                price, 
                isKeto, 
                image, 
                isVegan
            }
        });
        res.send({
            success: true,
            menuItem
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        });
    }

});
menuRouter.get("/menuItem/:menuItemId", (req, res) => {

    try {
        const { name, category, description } = req.body
        const menuItem = prisma.menuItem.create({
            data: {
                name,
                category,
                description
            }
        });
        res.send({
            success: true,
            menuItem
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        });
    }

});
menuRouter.get("/", (req, res) => {
    try{
        const menuItems = prisma.menuItem.findMany();
        res.send({
            success: true,
            menuItems
        });
    }catch(error) {
        res.send({
            success: false,
            error: error.message
        });
    }
});