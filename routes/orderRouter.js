import express from "express";
import { prisma } from "../server.js";

export const orderRouter = express.Router();

// get all orders
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { username: true, id: true } },
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

// route for getting a user's orders
orderRouter.get("/:userId", async (req, res) => {
  try {
    // get user ID
    const { userId } = req.params;
    // does this user exist?
    const userCheck = await prisma.user.findUnique({ where: { id: userId } });
    // if not, return an error
    if (!userCheck) {
      return res.send({
        success: false,
        error: "user with that id does not exist",
      });
    }
    // is the logged in user the one requesting their orders?
    if (!req.user || req.user.id !== userId) {
      return res.send({
        success: false,
        error: "User must be logged in to view their orders",
      });
    }
    // find orders
    const orders = await prisma.order.findMany({
      where: { userId },
    });
    // handle no orders
    if (!orders) {
      return res.send({ success: false, error: "no orders yet" });
    }
    //filter out any open orders so the frontend can easily display past orders only
    const completeOrders = orders.filter(
      (order) => order.status === "COMPLETE"
    );
    // return orders
    res.send({ success: true, orders: completeOrders });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// route for creating an order
orderRouter.post("/", async (req, res) => {
  try {
    // if they aren't logged in, reject the order
    if (!req.user) {
      res.send({
        success: false,
        error: "please log in to create your order",
      });
    }
    const order = await prisma.order.create({ data: { userId: req.user.id } });
    res.send({ success: true, order });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// route for adding an item to the cart
orderRouter.post("/items", async (req, res) => {
  try {
    const { orderId, menuItemId, quantity } = req.body;
    const userId = req.user.id;
    // make sure both order and item are included
    if (!menuItemId) {
      return res.send({
        success: false,
        error: "you need an item to add to this order",
      });
    }
    if (!orderId) {
      return res.send({
        success: false,
        error: "You need an order to add this item to",
      });
    }
    // make sure user Id is included and is valid
    if (!userId) {
      return res.send({
        success: false,
        error: "please log in to add an item",
      });
    }
    const isUserExisting = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!isUserExisting) {
      return res.send({
        success: false,
        error: "invalid token, please log in again",
      });
    }
    // check whether the order exists and whether the item exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });
    const existingItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    });
    if (!existingOrder) {
      return res.send({ success: false, error: "no such order exists" });
    }
    if (!existingItem) {
      return res.send({ success: false, error: "no such item exists" });
    }
    // add the item(s) to the cart
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId,
        menuItemId,
        quantity,
        userId,
      },
    });
    res.send({ success: true, orderItem });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// route for modifying the quantity of an item
orderRouter.put("/items/:orderItemId", async (req, res) => {
  try {
    // the id of OrderItem that we are accessing
    const { orderItemId } = req.params;
    if (!orderItemId) {
      res.send({
        success: false,
        error:
          "please supply the id of the item you are changing the quantity of",
      });
    }
    // item quantity is required
    const { quantity } = req.body;
    if (!quantity) {
      res.send({
        success: false,
        error: "You must supply a quantity to set this item to",
      });
    }
    // make sure the OrderItem exists
    const orderItemExisting = await prisma.orderItem.findUnique({
      where: {
        id: orderItemId,
      },
    });
    if (!orderItemExisting) {
      return res.send({
        success: false,
        error: "OrderItem does not exist in the database",
      });
    }
    // check whether the user owns this order
    if (!req.user || req.user.id !== orderItemExisting.userId) {
      return res.send({
        success: false,
        error: "the person who owns this order must be logged in to change it",
      });
    }
    // all being well, modify the quantity
    const orderItem = await prisma.orderItem.update({
      where: { id: orderItemId },
      data: { quantity },
    });
    res.send({ success: true, orderItem });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// remove an item from the cart
orderRouter.delete("/items/:orderItemId", async (req, res) => {
  try {
    const { orderItemId } = req.params;
    if (!orderItemId) {
      return res.send({
        success: false,
        error: "id needed to delete from cart",
      });
    }
    // check whether the thing you are removing exists
    const isExisting = await prisma.orderItem.findUnique({
      where: { id: orderItemId },
    });
    if (!isExisting) {
      return res.send({
        success: false,
        error: "what you seek to delete doesn't exist",
      });
    }
    // check whether the user owns the order item
    if (!req.user || req.user.id !== isExisting.userId) {
      return res.send({
        success: false,
        error: "correct user must be logged in to modify this order",
      });
    }
    // finally delete the item
    const orderItem = await prisma.orderItem.delete({
      where: { id: orderItemId },
    });
    res.send({ success: true, orderItem });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// route for closing an order
orderRouter.put("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, totalPrice } = req.body;
    if (!orderId || !status || !totalPrice) {
      return res.send({
        success: false,
        error: "orderId, status and total price are required",
      });
    }
    // check the order exists
    const isExisting = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!isExisting) {
      return res.send({ success: false, error: "order doesn't exist" });
    }
    // check the status is valid
    if (status !== "COMPLETE") {
      return res.send({ success: false, error: "status invalid" });
    }
    // check the total price is not zero
    if (totalPrice <= 0) {
      return res.send({
        success: false,
        error: "user is not paying anything for this order",
      });
    }
    // check the user owns the order
    if (!req.user || req.user.id !== isExisting.userId) {
      return res.send({
        success: false,
        error: "correct user is not logged in to modify this order",
      });
    }
    // all being well, close the order
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        totalPrice,
        status,
      },
    });
    res.send({ success: true, order });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// orderRouter.post("/order", async (req, res) => {
//     try {
//         const { menuItems, status, userId } = req.body;

//         // Calculate the total price by summing up the prices of menu items
//         const totalPrice = menuItems.reduce((total, menuItem) => total + menuItem.price, 0);

//         const order = await prisma.order.create({
//             data: {
//                 status,
//                 user: {
//                     connect: {
//                         id: userId,
//                     },
//                 },
//                 menuItems: {
//                     connect: menuItems.map((menuItem) => ({
//                         id: menuItem.id,
//                     })),
//                 },
//                 totalPrice: totalPrice || 0, // Set the total price
//             },
//             include: {
//                 user: true,
//                 menuItems: true,
//             },
//         });
//         res.send({
//             success: true,
//             order,
//         });
//     } catch (error) {
//         res.send({
//             success: false,
//             error: error.message
//         });
//     }
// });
