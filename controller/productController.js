const ProductModel = require('../model/Product');

// home route
exports.home = async(req, res) => {
    return res.send({
        status: true,
        success: true
    })
}

// get all product
module.exports.getProduct = async(req,res) => {
    try {

        // find all products
        ProductModel.find( (err, products) => {

            // if found error
            if (err) {
                res.status(500).json({ 
                    'success'   : false,
                    'error'     : err,
                    'message'   : 'Error on getting product'
                });
            } else {
                res.status(200).json({
                    'success'   : true,
                    'data'      : products,
                    'message'   : 'Product getting successfully'
                });
            }
        });

    } catch(err) {

        // return error
        return res.status(500).send({
            'success'   : false,
            'error'     : err,
            'message'   : 'Error on getting products'
        });

    }
}

// create new product
module.exports.addProduct = async(req,res) => {
    try {
        
        // prepare product data
        const { name, price, description, variants } = req.body;

        // prepare new product model
        const product = new ProductModel({
            'name'            : name,
            'description'     : description,
            'price'           : price,
            'variants'        : variants,
        });

        // save product
        product.save((err, newProduct) => {

            // if error found
            if (err) {
                res.status(500).json({ 
                    'success'   : false,
                    'error'     : err,
                    'message'   : 'Error on Product adding',
                });
            } else {

                // return response data
                res.status(200).json({
                    'success'   : true,
                    'data'      : newProduct,
                    'message'   : 'Product added successfully',
                });
            }
        });        

    } catch(err) {

        // return error data
        res.status(500).send({
            'success'   : false,
            'error'     : err,
            'message'   : 'Error on adding product'
        });
    }
}


// update product by product id
module.exports.updateProduct = async(req,res) => {
    try {
        // prepare product data
        const { name, price, description, variants } = req.body;

        // find product by product id and update
        ProductModel.findByIdAndUpdate(
            req.params.productId,
            { name, price, description, variants },
            { new: true },
            (err, updatedProduct) => {
                if (err) {
                    res.status(500).json({ 
                        'success'   : false,
                        'error'     : err,
                        'message'   : 'Error on adding product'
                    });
                } else {
                    res.status(200).json({
                        'success'   : true,
                        'data'      : updatedProduct,
                        'message'   : 'Product updated successfully'
                    });
                }
            }
        );
    } catch(err) {
        return res.status(500).send({
            'success'   : false,
            'error'     : err,
            'message'   : 'Error on adding product'
        })
    }
}

// delete product by product id
module.exports.deleteProduct = async(req,res) => {

    // find product by product id and delete product
    ProductModel.findByIdAndRemove(req.params.productId, (err, deletedProduct) => {
        if (err) {
            res.status(500).json({ 
                'success'   : false,
                'error'     : err,
                'message'   : 'Error on deleting product'
            });
        } else {
            res.status(200).json({
                'success'   : true,
                'data'      : deletedProduct,
                'message'   : 'Product deleted successfully'
            });
        }
    });
}

// add new variant of a product
module.exports.addProductVariant = async(req,res) => {
    try {
        
        const { name, sku, additional_cost, stock_count } = req.body;

        // find product by id and add variant of that product
        ProductModel.findById(req.params.productId, (err, product) => {
            if (err || !product) {
                res.status(404).json({ 
                    'success'   : false,
                    'error'     : err,
                    'message'   : 'Product not found'
                });
            } else {
                const variant = {
                    name, 
                    sku, 
                    additional_cost, 
                    stock_count
                };
        
                // push the new variant into all variants of product 
                product.variants.push(variant);

                // save the product
                product.save((err, savedProduct) => {
                if (err) {
                    res.status(500).json({ 
                        'success'   : false,
                        'error'     : err,
                        'message'   : 'Product not found'
                    });
                } else {
                    res.status(200).json({
                        'success'   : true,
                        'data'      : savedProduct,
                        'message'   : 'Variant added successfully'
                    });
                }
                });
            }
        });

    } catch(err) {
        res.status(500).send({
            'success'   : false,
            'error'     : err,
            'message'   : 'Error on adding product variant'
        });
    }
}

// update variant of a product
module.exports.updateProductVariant = async(req,res) => {
    try {

        const { name, sku, additional_cost, stock_count } = req.body;
        
        // find product
        ProductModel.findOneAndUpdate(
            { _id: req.params.productId, 'variants._id': req.params.variantId },
            { $set: { 'variants.$.name': name, 'variants.$.sku': sku, 'variants.$.additional_cost': additional_cost, 'variants.$.stock_count': stock_count } },
            { new: true },
            (err, updatedProduct) => {
                if (err) {
                    res.status(500).json({ 
                        'success'   : false,
                        'error'     : err,
                        'message'   : 'Error on updating product variant'
                    });
                } else {
                    res.status(200).json({
                        'success'   : true,
                        'data'      : updatedProduct,
                        'message'   : 'Updating variant successfully'
                    });
                }
            }
        );

    } catch(err) {
        res.status(500).send({
            'success'   : false,
            'error'     : err,
            'message'   : 'Error on updating product variant'
        });
    }
}

// delete variant of a product
module.exports.deleteProductVariant = async(req,res) => {
    try {
        
        // delete product variant
        ProductModel.findByIdAndUpdate(
            req.params.productId,
            { $pull: { variants: { _id: req.params.variantId } } },
            { new: true },
            (err, updatedProduct) => {
                if (err) {
                    res.status(500).json({ 
                        'success'   : false,
                        'error'     : err,
                        'message'   : 'Error on deleting product variant'
                    });
                } else {
                    res.status(200).json({
                        'success'   : true,
                        'data'      : updatedProduct,
                        'message'   : 'Variant deleted successfully'
                    });
                } 
            }
        );

    } catch(err) {
        res.status(500).send({
            'success'   : false,
            'error'     : err,
            'message'   : 'Error on deleting product variant'
        });
    }
}

// search product
module.exports.searchProduct = async(req,res) => {
    try {
        
        const searchTerm = req.query.text;

        // search products
        ProductModel.find(
            {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                    { 'variants.name': { $regex: searchTerm, $options: 'i' } },
                ],
            },
            (err, products) => {
                if (err) {
                    res.status(500).json({ 
                        'success'   : false,
                        'error'     : err,
                        'message'   : 'Error on finding products'
                    });
                } else {
                    res.status(200).json({
                        'success'   : true,
                        'data'      : products,
                        'message'   : 'Products fetched successfully'
                    });
                }
            }
        );

    } catch(err) {
        res.status(500).send({
            'success'   : false,
            'error'     : err,
            'message'   : 'Error on finding product'
        });
    }
}