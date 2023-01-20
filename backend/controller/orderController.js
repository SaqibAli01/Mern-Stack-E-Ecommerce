//---------import file --------------
//product ham ko reference k lia chahia ha
// Order ko sb sy phaly import krna ha

const Order = require('../model/orderModel');

const Product = require('../model/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const { findById } = require('../model/orderModel');

//-------------Create New Order ---------------------
//step 2 is ko orderRotes.js me ja k import kr dana ha
exports.newOrder = catchAsyncError(async (req, res, next) => {

    //destructure kia ha orderModel me sy

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,

    } = req.body;

    //ye Order opr import kia ha oederModel me sy..
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });

});

//----------------Get Single Order Details----------------------
// is ko order route me import kr dna ha 
// const order = await findById(req.params.id); is sy user ki id mil jy gi ham ko
//populate() sy ham ko user ki id sy us ka email or name be mil jy ga

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 400));
    }
    res.status(200).json({
        success: true,
        order,
    });

});


//----------------Get logged in User Orders----------------------
// is ko order route me import kr dna ha 
// jo user login ha wo he apny sary order dhak skta ha
// ye user ki id ko find kr k sary id order dhaka dy ga or ... req.user._id is login ki id ay gi


exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

//----------------Get All Order Admin----------------------
// is ko order route me import kr dna ha 
//is me admin sary order ko dhak skta ha

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    //admin ko total amount show ho
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

//----------------Update Order Status- Admin----------------------
// is ko order route me import kr dna ha 
//is me admin sary order ko dhak skta ha

exports.updateOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id ", 404))
    }
    //agr order already delivered ho gy ha to
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler('You have already Delivered this Order', 400));
    }
    //jb tak order delivered na ho jy us time tak quantity kam na ho 
    // order Item ki array me jo quantity me us waqt tak ka ni krni jab tak deliver na ho jy
    //order database me ak phela object ha or is k under product or quantity ati ha
    order.orderItems.forEach(async (odr) => {
        await updateStock(odr.product, odr.quantity);
    })

    // orderStatus ya to processing me ho ga ya deliver ho jy ga to update kr dy 
    // or ham ny is ko status he dna ha 
    order.orderStatus = req.body.status;

    // ye condition is lia lagi ha agr order shiped me bhaji ha
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    //ab is ko save krna  ha
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,

    });
});

//is function ham ny id or quantity bahji ha
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    //Product ko opr import kr dia ha
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


// -------- end Update --------------------------

//----------------Delete Order  Admin----------------------
// is ko order route me import kr dna ha 
//is me admin kise be order ko del kr skta ha

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id ", 404))
    }

    await order.remove();

    res.status(200).json({
        success: true
    });

});