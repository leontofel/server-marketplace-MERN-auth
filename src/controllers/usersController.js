import users from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import products from "../models/Product.js";
dotenv.config();

export default class UsersController {
    static login = async (req, res) => {
        try {
            const { email, password } = req.body
      
            if (!email || !password) {
              return res.json({ ok: false, why: 'please insert email and password' })
            }
            if (typeof (email) !== "string" || typeof (password) !== "string") {
              return res.status(500).json({ ok: false, why: 'format is wrong' })
            }
      
            let user = await users.findOne({ "email": email })
      
            if (user && (await bcrypt.compare(password, user.password))) {
              const token = jwt.sign(
                { user_id: (user._id),
                user_name:  user.name,
              user_address: user.address},
                process.env.TOKEN_KEY || "TOKENkey",
                {
                  expiresIn: "6d",
                }
              );
              return res.status(200).send(token);
            }
      
            return res.status(400).send("Invalid Credentials");
      
          } catch (err) {
            console.log(err);
      
          }
    }

    static register = async (req, res) => {
        try {
            const { user, email, password, address } = req.body
            if (!(email && password && address && user)) {
              res.status(400).send("All input is required");
            }
            const oldUser = await users.findOne({ "user": user, "password": password })
            if (oldUser) {
              return res.status(409).send("User Already Exist. Please Login");
            }
      
            let encryptedUserPassword = await bcrypt.hash(password, 10);
            const newUser = await users.create({
              
              "user": user,
              "email": email.toLocaleLowerCase(),
              "password": encryptedUserPassword,
              "primeMember": false,
              "cart": [],
              "address": address
            });
      
            
            const token = jwt.sign(
              { newUser },
              process.env.TOKEN_KEY || "TOKENkey",
              {
                expiresIn: "6d",
              }
            ); 
      
            return res.status(201).send(token);
          } catch (err) {
            console.log(err.message);
      
          }
    }

    static getUserInfo = async (req, res) => {
      try {
        const {id} = req.params;
        users.findById(id).exec((err, user) => {
          if (err) res.status(400).send({ message: `${err.message} - user id was not found` })
          if (user) res.status(200).json(user.user);
      });

      }catch(err){
        console.error(err)
      } 
    }

    static addProductToCart = async (req, res) => {
      try {
        const {id} = req.params;
        products.findById(id).exec((err, user) => {
          if (err) res.status(400).send({ message: `${err.message} - user id was not found` })
          if (user) users. res.status(200).json(user.cart);
      });

      } catch(err) {
        console.error(err);
      }
    }

    static removeProductFromCart = async (req, res) => {
      try {

      } catch(err) {
        console.error(err);
      }
    }
}