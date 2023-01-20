// <--------------------------------------------------------------------------Import Files----------------------------------------------------------------------------->
// get product from productModel 

// const { use } = require('../app');
const Product = require('../model/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');


// <--------------------------------------------------------------------------End Import Files----------------------------------------------------------------------------->



// <--------------------------------------------------------------------------Post----------------------------------------------------------------------------->

//(post) => create products Admin ---------------------or is ko export kia ha is ko ko route me get kry gy ja k ab http://localhost:4000/api/v1/product/new;
//catchAsyncError is k under me ye wala code kr dia ha..is sy ham tri catch lag lag lhenky sy ak line me lhek dia ha;
// req.body.user sy user ko get kia database me sy phir user ki id ko get kia ha;

exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});


// <--------------------------------------------------------------------------Post End----------------------------------------------------------------------------->



// <-------------------------------------------------------------Get  All Products ------------------------------------------------------------>;
// (Get)=> Get All Products  ---------------------is file ko routesProducts.js me get kia ga.. (Product.find() ye product model sy get kia ha)
// Async yaha yaha pr used kia ha me ny waha pr catchAsyncError() ko used kr lena ha ab ye me ny ak line me code lhek dia ha
// ab is me search krny k lia query lagy gy ApiFeatures.js ko is file me import kry gy req.query.keyword
// query= Product.find()
// req.query = search item name or .search().filter(); ye 2no function ko call ki ha me ny
// search url :  http://localhost:3000/api/v1/products?keyword=laptop
// .pagination(resultPerPage); agr hamy pas 20 page ha to ham her page me 20 , 20 product ko show krnwa ha to wo jo total product ha us ko asy show kry gy
// const resultPerPage = 5; her page me 5 product show ho gi 
// total product account ho gi is me sy

exports.getAllProducts = catchAsyncError(async (req, res) => {

    // next(new ErrorHandler("This is temp error",400))

    const resultPerPage = 6;

    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
    // .pagination(resultPerPage);

    //.pagination(resultPerPage); 
    
    

    // const AllProductsShow = await Product.find();..in sb ko frontEnd me reducerProduct.js me get krna ha ha
    const products = await apiFeature.query;
    //total product account 
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage)

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// <---------------------------------------------------------------------------End Get All Products  End-------------------------------------------------------------------------->


// <---------------------------------------------------------------------------Put (Update)--------------------------------------------------------------------------->
//update Product --Admin 
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    // use.params ham id get krny k lia lgty ha
    // console.log("req.params------" , req.params)
    // console.log("Product Id", upProduct);

    let upProduct = await Product.findById(req.params.id);

    if (!upProduct) {
        return next(new ErrorHandler("Product is not Found! ", 404));
    }
    else {
        upProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            upProduct,
        })
    }
});

// <-------------------------------------------------------------------------Put (Update) End----------------------------------------------------------------------->


// <---------------------------------------------------------------------------Delete--------------------------------------------------------------------------->
//Delete Product --Admin 
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    let delProduct = await Product.findById(req.params.id);

    if (!delProduct) {
        return next(new ErrorHandler(`Product is not Found! `, 404));
    }


    await delProduct.remove()
    res.status(200).json({
        success: true,
        message: "Product is Delete SuccessFul"
    })

}
)
// <-------------------------------------------------------------------------Delete----------------------------------------------------------------------->


// <--------------------------------------------------------------Get Single Product Details---------------------------------------------------->
//Details Product --Admin 
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(`Product is not Found! `, 404));
    }
    res.status(200).json({
        success: true,
        product,
    });

}
);
// <-------------------------------------------------------------------------End Get Single Product Details---------------------------------------------------------------------->


// <------------------------------------------------------Create New  Review or Update the review ---------------------------------------------------------------------->
//jis ny review dna ha us ki id, name review krwna ha ,, is ny comment kia ha review me
//userSchema sy destructuring ki ha

exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    //create object 
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    // ye opr jo 2 obj review or variable product me sy find krna is me forEach sy be review find kr sky hs
    //rev.user.toString() === req.user._id.toString()) is me post krny waly or comment krny waly 2no ki id equal ho to review already dia ha
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
    //agr review already dia ho ha to ye condition chaly gi
    if (isReviewed) {
        //jo already review dia ha to use ko update kr dy is thra

        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    }

    //agr review already dia ho ha to ye condition chaly 
    //product opr variable ha or reviews ye userSchema me dia 
    //.push(review) ye opr obj bania ha jo review me push kr dia ha
    //numOfReviews ye userSchema sy lia h

    else {
        product.reviews.push(review),
            product.numOfReviews = product.reviews.length
    }

    //ye userSchema me ratings jo ha is me overAll rating ki average nikal dy gy ham
    //is ko divide kr dy gy total review sy 
    // avg  2 + 4 +6 +2 = 14/4 divide total number  
    //ye nechy loop chalia ha
    let avg = 0;
    product.reviews.forEach((rev) => {
        // console.log("rev.rating", rev.rating); 
        avg += rev.rating
    });

    // console.log("avg", avg);
    // console.log("product.reviews.length", product.reviews.length);
    // console.log("product.ratings", product.ratings);

    product.ratings = avg / product.reviews.length;

    //save
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })

})

// <------------------------------------------------------end Create New  Review or Update the review ---------------------------------------------------------------------->


// <------------------------------------------------------Get All Review Single Product ---------------------------------------------------------------------->
//is ko productRoutes me import kr dia ha

exports.getProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product is not Found!", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});


// <------------------------------------------------------The End Get All Review Single Product ---------------------------------------------------------------------->

// <------------------------------------------------------Get Delete Review Single Product ---------------------------------------------------------------------->
//is ko productRoutes me import kr dia ha
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    //query ka matlib ha ham ny productId dni ha jo product ko create krty waqat banty ha
    const product = await Product.findById(req.query.productId);
    // console.log("product", product);
    if (!product) {
        return next(new ErrorHandler("Product is not Found!", 404));
    }

    //jo reviews ham chahia wo rhky baqi del kr dy gy ....rev._id.toString()  ye review ki id a jy gi or rev.query.id is me reviws krny wali ki
    //rev.query.id is ka matlib ha jo review krty waqt id data ha user ki wo dani ha
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString());

    //agr reviews ni ay ga to ratings be change krni ha
    //ye userSchema me ratings jo ha is me overAll rating ki average nikal dy gy ham
    //is ko divide kr dy gy total review sy 
    // avg  2 + 4 +6 +2 = 14/4 divide total number  
    //ye nechy loop chalia ha
    let avg = 0;
    // console.log("avg", avg);
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;
    // console.log("prorating", ratings);
    const numOfReviews = reviews.length;


    await Product.findByIdAndUpdate(req.query.productId,
        {
            //ye 3no cheezo ko update kr dy gy
            reviews,
            ratings,
            numOfReviews
        }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }
    );

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// <------------------------------------------------------Get Delete Review Single Product ---------------------------------------------------------------------->
