import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    title: String,
    price: Number,
    description: String,
    photos: Array,
    type: String,
    comments: Array,
    features: Array,
},
    {
        strictPopulate: false
    })

const products = mongoose.model('product', productSchema);


export default products;
