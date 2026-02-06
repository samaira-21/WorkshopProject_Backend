const express = require("express");
const productController = require("./../Controllers/productController");
const productRouter = express.Router();

productRouter.route("/")
.get(productController.getAllProducts)
.post(productController.createProduct);

productRouter.route("/:id")
.get(productController.getProduct)
.put(productController.putProduct)
.delete(productController.deleteProduct);

module.exports = productRouter;