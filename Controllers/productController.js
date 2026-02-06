const Products = require("./../Models/productModel");

exports.getAllProducts = async(req, res) => {
  try{
    const productsData = await Products.find();
    res.status(200).json({
    status: "Success",
    length: productsData.length,
    timeOfHit: req.requestTimeOfHit,
    data: productsData,
  });
  }
  catch(err){
    res.status(400).json({
        status: "fail",
        timeOfHit: req.requestTimeOfHit,
        message: err.message,
    })
  }
};

exports.getProduct = async(req, res) => {
  try{
    const findProduct = await Products.findById(req.params.id);
    if (!findProduct) {
        return res.status(404).json({
        status: "Fail",
        message: "Product not found check your id",
        });
    }
    res.status(200).json({
        status: "success",
        data: findProduct,
    });
  }
  catch(err){
    res.status(400).json({
        status: "fail",
        timeOfHit: req.requestTimeOfHit,
        message: err.message,
    });
  }
};

exports.createProduct = async(req, res) => {
  try{
    console.log(req.body);
    const product = await Products.create(req.body)
    res.status(201).json({
        status: "success",
        data: product,
    });
  }
  catch(err){
    res.status(400).json({
        status: "fail",
        timeOfHit: req.requestTimeOfHit,
        message: err.message,
    })
  }
}

exports.putProduct = async(req, res) => {
  try{
    const updateProduct = await Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true},
    );
    if (!updateProduct) {
        return res.status(404).json({
            status: "Fail",
            data: "Product not found check your ID",
        });
    }
    res.status(200).json({
        status: "Success", 
        data: updateProduct,
    });
  }
  catch(err){
    res.status(400).json({
        status: "fail",
        timeOfHit: req.requestTimeOfHit,
        message: err.message,
    });
  }
};

exports.deleteProduct = async(req, res) => {
  try{
    const findProduct = await Products.findByIdAndDelete(req.params.id)
  if (!findProduct) {
    return res.status(404).json({
      status: "Fail",
      message: "Product not found check your id",
    });
  }
  res.status(204).json({
    status: "Deleted",
  })
  }
  catch(err){
    res.status(400).json({
        status: "fail",
        timeOfHit: req.requestTimeOfHit,
        message: err.message,
    });
  }
};