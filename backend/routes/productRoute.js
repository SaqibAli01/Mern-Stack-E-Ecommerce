const express = require('express');
const router = express.Router();

// <-------------------------------------------------------------------(import productController.js) ------------------------------------------------------>
//import productController.js ki sb export file ko me ny is file me import kia ha

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReview, deleteReview } = require('../controller/productsController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// <-----------------------------------------------------------------End (import productController.js) ------------------------------------------------------>



// <------------------------------------------Get All Products (import productController.js) ----------------------------------------->

//(Get)=> create one route product ....or  getAllProducts ko me ny ProductController wali file me sy import kia ha .....// url: http://localhost:3000/api/v1/products 
// router.route('/products').get(isAuthenticatedUser, getAllProducts);
router.route('/products').get(getAllProducts);

// <-----------------------------------------------------------------------Get Method End----------------------------------------------------------------------->



// <--------------------------------------------------------------Post Method (import productController.js) --------------------------------------------------------->

//(post)=> create product ka route ha ye // url: http://localhost:3000/api/v1/product/new 
//authorizeRoles("admin") ye function me auth.js me bani ha.. waha sy idr call ki ha me ny 
// admin ka matlib ha serf admin he access kr sky in ko user na kr sky ..create or update or delete in me admin used kia ha me ny 

router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// <-------------------------------------------------------------------------Post Method End ------------------------------------------------------------------------>


// <--------------------------------------------------------------Put (Update) Method (import productController.js) ------------------------------------------------->
//put method updateProduct ko import kia me ny http://localhost:3000/api/v1/product/638ef3850b124d857f104eae
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// <-------------------------------------------------------------------Put (Update) Method End -------------------------------------------------------------------->



// <--------------------------------------------------------------delete Method (import productController.js) ------------------------------------------------->
//put method updateProduct ko import kia me ny // http://localhost:3000/api/v1/product/638f20e25011422fa4c5632b 
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// <-------------------------------------------------------------------delete Method End -------------------------------------------------------------------->


// <--------------------------------------------------------------Get Method single product details (import productController.js) ------------------------------------------------->
// http://localhost:3000/api/v1/product/638ee4d9bf08037c6db51756 

router.route('/product/:id').get(getProductDetails);

// <--------------------------------------------------------------End  Get Method single product details  ------------------------------------------------->

// <--------------------------------------------------------------Put Method [Create New  Review or Update the review ]  (import productController.js) ------------------------------------------------->
// http://localhost:3000/api/v1/product/638ee4d9bf08037c6db51756 
//put method delete be kr skta ha or update

router.route('/review').put(isAuthenticatedUser, createProductReview);

// <--------------------------------------------------------------End  Get Method single product details  ------------------------------------------------->

// <--------------------------------------------------------------Get Method [Get All Review Single Product ]  (import productController.js) ------------------------------------------------->
router.route('/reviews').get(getProductReview);
// <--------------------------------------------------------------Get Method [Get All Review Single Product ]  (import productController.js) ------------------------------------------------->


// <--------------------------------------------------------------Delete Method [Get Delete Review Single ProductGet All Review Single Product ]  (import productController.js) ------------------------------------------------->
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);
// <--------------------------------------------------------------Delete Method [Get Delete Review Single ProductGet All Review Single Product ]  (import productController.js) ------------------------------------------------->




module.exports = router