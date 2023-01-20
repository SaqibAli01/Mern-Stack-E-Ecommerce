import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import { addItemsToCart } from '../../redux/action/cartAction';
import { useParams } from 'react-router-dom';
// import Carousel from "react-material-ui-carousel";
import Carousel from 'react-bootstrap/Carousel';
import ReactStars from "react-rating-stars-component";
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';

//import useSelector to get data redux
// //import getProductDetails
import { useSelector, useDispatch } from 'react-redux';

import { clearErrors, getProductDetails, newReview } from '../../redux/action/ProductAction';

import ReviewCard from './ReviewCard';
import MetaData from '../metadata/MetaData';


//---------Review ----------------------
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
  import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../redux/constant/ProductConstance';
  
//   import { NEW_REVIEW_RESET } from "../../constants/productConstants";


//match is lia lheka ha me ny q getProductDetails me id di ha
function ProductDetails() {
    // const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const routeParams = useParams();
    // console.log("============================");
    // console.log("Route Params---", routeParams.id);
    // console.log("============================");



    //front sy id li
    let { id } = useParams();
    // console.log("match id" , id);

    //redux sy data get kia ha ye redux store sy get kis ha productDetails
    const { product, loading, error } = useSelector((state) => state.productDetails);
    // console.log("Product Details", product)
    // console.log("Product Details loading", loading)
    // console.log("Product Details error" , error)
    // console.log("product.images ", product.images)

    //front end me id asy get krty ha 
  
  
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );
    
      //precision = star
      const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
   
   
   
    useEffect(() => {
        if (error) {
            // return alert.error(error); jo clear error action me lagia ha us sy error show hony k bad clear ho jy ga..
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors ());
          }
      
          if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
          }
        dispatch(getProductDetails(id));

        // ye [] Array dependance ko bulty  
    }, [dispatch, routeParams.id, error, alert, reviewError, success])


    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    //add to card 
    const addToCartHandler = () => {
        dispatch(addItemsToCart(routeParams.id, quantity));
        alert.success("Item Added To Cart");
    };

    //submit reviews 
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };


    //increaseQuantity
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };
    //decreaseQuantity
    const decreaseQuantity = () => {
        if (1 >= quantity) return; 
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", routeParams.id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

    // const options = {
    //     edit: false,
    //     color: "rgba(20,20,20,0.1)",
    //     activeColor: "tomato",
    //     size: window.innerWidth < 600 ? 20 : 25,
    //     value: product.ratings,
    //     isHalf: true
    // }
    //readOnly sy ham serf read kr sky ha edit ni kr skty ha ham
    // const options = {
    //     size: "large",
    //     value: product.ratings,
    //     // value: 4,Only
    //     readOnly: true,
    //     precision: 0.5,
    // };

    return (<>
        {/* loading is lia lagia ha jab tak sary componets load na ho jy us time tak run ni ho ga . */}

        <Fragment>

            {loading ? <Loader /> :
                <>
                    {/*---------------------------------------------------- Title ----------------------------------------- */}

                    <MetaData title={`${product.name} E-COMMERCE`}/>

                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                <Carousel.Item>

                                    {product.images &&
                                        product.images.map((item, i) => (
                                            <img
                                                className="CarouselImage"
                                                key={i}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        ))}

                                </Carousel.Item>

                                {/* <Carousel.Item>
                                                   <img
                                                      className="d-block w-100"
                                                          src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                              alt="Second slide"
                                                                  />
                                                                      <Carousel.Caption>
                                                                        <h3>Second slide label</h3>
                                                                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                                                  </Carousel.Caption>
                                                                                      </Carousel.Item> */}

                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                {/* <Rating {...options} /> */}
                                <ReactStars {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>


                            <div className="detailsBlock-3">
                                <h1>{`$${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>

                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    {/* Review ko show kia ha ...agr reviews ho to us ka first reviews show ho jy ga.. */}
                    {/* is me Reviews show ho gy */}
                    <h3 className="reviewsHeading">REVIEWS</h3>
            {/* _______________________________________________________________________________________________ */}
            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

            {/* ___________________________________________ _____________________________________________ */}


                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    //review card me ham ny ak props bhja review ka 
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}

                </>}


        </Fragment>
    </>)
}

export default ProductDetails