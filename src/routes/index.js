import express from "express";
import products from "./productRoutes.js";
import users from "./usersRoutes.js";


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ title: "Product app" });
    });
    app.use(
        express.json(),
        products,
        users
    )
}

export default routes;