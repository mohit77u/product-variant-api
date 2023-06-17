const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controller/productController");


router.get("/", productController.home);
router.get("/products",  productController.getProduct);
router.post("/product",  productController.addProduct);
router.put("/product/:productId",  productController.updateProduct);
router.delete("/product/:productId",  productController.deleteProduct);
router.post("/products/:productId/variants",  productController.addProductVariant);
router.put("/products/:productId/variants/:variantId",  productController.updateProductVariant);
router.delete("/products/:productId/variants/:variantId",  productController.deleteProductVariant);
router.get("/products/search",  productController.searchProduct);


module.exports = router;