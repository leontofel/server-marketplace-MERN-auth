import express from "express";
import UsersController from '../controllers/usersController.js';
import { verifyToken } from "../middleware/auth.js";

const usersRouter = express.Router();

usersRouter
    .post("/cadaster", UsersController.register)
    .post("/login", UsersController.login)
    .post("/verify-token", verifyToken)
    .get("/user/:id", UsersController.getUserInfo)
    .post("/shopping-cart", UsersController.addProductToCart)
    .delete("/shopping-cart", UsersController.removeProductFromCart)

    export default usersRouter;