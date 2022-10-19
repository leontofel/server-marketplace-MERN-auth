import products from "../models/Product.js";
import mongoose from "mongoose";

export default class ProductsController {
    static listProduct = (req, res) => {
        products.find()
        .populate()
        .exec((err, products) => {
            if (err) console.log(err);
            if (products) res.status(200).json(products);
        });
    }

    static listProductBySearch = (req, res) => {
        let search = req.query.title;
        products.find( {"title": {
            $in: [new RegExp(`^(${search})\X*`, 'i')]
    }})
        .populate()
        .exec((err, product) => {
            if (err) console.log(err);
            if (product) res.status(200).json(product);
        })
    }
    

    static getProductSingleCard = (req, res) => {
        products.count()
        .exec((err, count) => {
            let random = Math.floor(Math.random() * count);
            products.findOne().skip(random).exec((err, result) => {
                if(err) console.log(err);
                if(result) res.status(200).json(result);
            })

        })
    }
    
    static getProductMediumCard = (req, res) => {
        products.count()
        .exec((err, count) => {
            let random = Math.floor(Math.random() * count);
            products.find().limit(4).skip(random).exec((err, result) => {
                if(err) console.log(err);
                if(result) res.status(200).json(result);
            })

        })
    }


    static listProductById = (req, res) => {
        const {id} = req.params;
            products.findOne({"_id": mongoose.Types.ObjectId(id)}).populate()
            .exec((err, product) => {
                if (err) res.status(400).send({ message: `${err.message} - product id was not found` })
                if (product) res.status(200).json(product);
            });
        
    }

    static addProduct = (req, res) => {
        let product = new products(req.body);
        product.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - failed to add product.` });
            } else {
                res.status(201).send(product.toJSON());
            }
        });

    }

    static updateProduct = (req, res) => {
        const id = req.params.id;

        products.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'The product was updated.' });
            } else {
                res.status(500).send({ message: err.message });
            }
        });
    }

    static deleteProduct = (req, res) => {
        const id = req.params.id;

        products.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'product was successfully deleted' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static listProductByType = (req, res) => {
        const type = req.query.type;
        products.find({'type': type}, {}, (err, products) => {
            res.status(200).send(products);
        })

    }
}


