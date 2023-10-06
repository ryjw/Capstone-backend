import express from "express";
import { prisma } from "../server.js";

export const menuRouter = express.Router();

menuRouter.get("/", (req, res) => {
  try {
    const menuItems = prisma.menuItem.findMany();
    res.send({
      success: true,
      menuItems,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

menuRouter.get("/menuItem/:menuItemId", (req, res) => {
  try {
    const { menuItemId } = req.params;
    // check whether the item exists, and if it does, return it
    const menuItem = prisma.menuItem.findUnique({ where: { id: menuItemId } });
    if (!menuItem) {
      return res.send({ success: false, error: "item not found with this id" });
    }
    res.send({
      success: true,
      menuItem,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

menuRouter.post("/menuItem", async (req, res) => {
  try {
    const { name, category, description, price, isKeto, image, isVegan } =
      req.body;
    // only an admin may create a menu item
    if (!req.user || req.user.role !== "ADMIN") {
      return res.send({
        success: false,
        error: "you must be logged in as admin to add a menu item",
      });
    }
    // error handling
    if ((!name || !category || !price, !image)) {
      return res.send({
        success: false,
        error:
          "you must include name, category, price, and image (name) to create an item",
      });
    }
    if (isKeto === undefined || isVegan === undefined) {
      return res.send({
        success: false,
        error:
          "make sure to add isKeto and isVegan and set the status for each to either true or false",
      });
    }
    // create the item
    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        category,
        description,
        price,
        isKeto,
        image,
        isVegan,
      },
    });
    res.send({
      success: true,
      menuItem,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// modify a menu item
menuRouter.put("/:menuItemId", async (req, res) => {
  try {
    const { menuItemId } = req.params;
    const { name, category, image, isKeto, isVegan, description, price } =
      req.body;
    // filter out non-admins
    if (!req.user || req.user.role !== "ADMIN") {
      return res.send({
        success: false,
        error: "you must be logged in as admin to modify a menu item",
      });
    }
    // see if the item exists
    const isExisting = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    });
    if (!isExisting) {
      return res.send({
        success: false,
        error: "The menu item id is wrong, or the item does not exist",
      });
    }
    const menuItem = await prisma.menuItem.update({
      where: { id: menuItemId },
      data: { name, category, image, isKeto, isVegan, description, price },
    });
    res.send({ success: true, menuItem });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// delete a menu item
menuRouter.delete("/:menuItemId", async (req, res) => {
  try {
    // filter out non-admins
    if (!req.user || req.user.role !== "ADMIN") {
      return res.send({
        success: false,
        error: "you must be logged in as admin to delete a menu item",
      });
    }
    const { menuItemId } = req.params;
    if (!menuItemId) {
      return res.send({
        success: false,
        error: "Please include the id of the item you are trying to delete",
      });
    }
    // check if the item exists
    const isExisting = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    });
    if (!isExisting) {
      return res.send({
        success: false,
        error: "The menu item id is wrong, or the item does not exist",
      });
    }
    // delete the item
    const menuItem = await prisma.menuItem.delete({
      where: { id: menuItemId },
    });
    res.send({ success: true, menuItem });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
