//create folder no 7 or ye product schema bania ha

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description "]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 Characters"],
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 Character"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },

        }

    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

//ab is ko ham export kr dy gy
//is ko sb sy phaly.... controller me import kry gy.."Product" is ko ham products ko get kis ha  productController me

module.exports = mongoose.model("Product", productSchema);


//ye is lia bania jo admin ka partner admin ho ho wo be is ko access kr skta ha
// user:{
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//     required: true,
// },