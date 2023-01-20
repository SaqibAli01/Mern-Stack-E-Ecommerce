const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    //shippingInfo

    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        }
    },

    //ab order item ko bany gy

    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],

    //ab user be ho ga

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    //ab payment ki info b

    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },

    },

    paidAt: {
        type: Date,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


// step 1 is ko orderController.js me ja k import kr dna ha

module.exports = mongoose.model("Order", orderSchema);