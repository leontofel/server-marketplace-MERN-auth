import mongoose from "mongoose";
//import { IProduct } from "../interface/IProduct";

const clientSchema = new mongoose.Schema({
    user: String,
    email: String,
    password: String,
    cart: Array ,
    primeMember: Boolean ,
    address: {
        street: String,
        number: String,
        complement: String,
        area: String,
        city: String,
        state: String,
        cep: String
    } 
},
{
    strictPopulate: false
})

const clients = mongoose.model('client', clientSchema);


export default clients;