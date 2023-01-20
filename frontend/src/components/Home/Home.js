import './Home.css';
// import '/Product.css'
import React, { useEffect } from "react";
// import Product from './ProductCard';
import ProductCard from './ProductCard';
import MetaData from '../metadata/MetaData'
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';
//--------import file Product.js------
import { clearErrors, getProduct } from '../../redux/action/ProductAction';


//--------Redux sy data leny k lea----
import { useDispatch, useSelector } from 'react-redux';


const product = {
  name: "Blue T-shirt",
  image: [{ url: "https://www.pngitem.com/pimgs/m/478-4786769_men-t-shirt-png-image-t-shirt-png.png" }],
  price: "$3000",
  id: "Saqib"
}
export default function Home() {

  const alert = useAlert();
  // console.log("Alert ..", alert)

  //store me sy data ko lia ha
  const dispatch = useDispatch();

  //redux sy data get krny k lia 
  const { loading, error, products } = useSelector((state) => state.products);

  // console.log("Error ..........", error);
  // console.log("loading ..........", loading);
  // console.log("products ..........", products);
  // console.log("productsCount ..........", productsCount);
  // console.log("productsCount", productsCount)

  useEffect(() => {
    // condition lagi agr error ho to phir alert dena
    if (error) {
      // return alert.error(error) .. return b kr skty ha lqn clear error lagia ha action us sy error clear ho jy ga 
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch((getProduct()));
  }, [dispatch, error, alert])


  return (
    <>
      {
        loading ?
          <Loader /> :
          <>
            <MetaData title="HOME WORKING" />
            <div className="banner">
              <p>Welcome to E-Commerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>

              <a href="#container">
                <button className='inverted-4 '>
                  Scroll
                </button>
              </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">

              {/* products: action.payload.products,  ye reducer me products lheka ha */}
              {/* <Product product={product} /> */}
              {/* <Product/> */}

              {products && products.map((product) => <ProductCard product={product} />)}
            </div>

          </>
      }
    </>
  )
}
