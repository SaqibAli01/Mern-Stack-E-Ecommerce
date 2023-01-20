import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../../redux/action/ProductAction';
import Loader from '../../Loader/Loader';
import ProductCard from '../../Home/ProductCard';
//get id for frontend
import { useParams } from 'react-router-dom';
import MetaData from '../../metadata/MetaData';
// import { Pagination } from '@material-ui/lab';
import Pagination from 'react-bootstrap/Pagination';
import { useAlert } from 'react-alert';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";



//------------------categories----------------
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Product 9",
  "Attire",
  "Camera",
  "SmartPhones",
];

function Products() {
  //---------------------------Redux----------------------------------------
  const dispatch = useDispatch();
  const alert = useAlert();


  // -------------------------------------------Hooks used-------------------------------------

  //initialState is me hemsha 1 he rhy gi
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);


  // -------------------------------------------ReducerPRoduct.js data sy  fetch -------------------------------------

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  //front sy id li
  let { id } = useParams();
  // console.log("match id-----------------------", id);

  //---------------------------------------pagination -------------------------------------------------------
  const setNextPageNo = (e) => {
    console.log("setCurrentPageNo", e)
    setCurrentPage(currentPage + 1);
    // console.log("Next", setCurrentPage(currentPage + 1))


  };
  const setPrvPageNo = (e) => {

    // console.log("setCurrentPageNo", e)
    if (currentPage <= 1) {
      console.log("Zero No page")
    }
    else {

      setCurrentPage(currentPage - 1);
      // console.log("Prv", setCurrentPage(currentPage - 1))
    }

  };
  const setLastPage = () => {
    setCurrentPage(resultPerPage.length);
    console.log("resultPerPage.length ", resultPerPage.length)
  }
  //----------------------------------------------UseEffect---------------------------------
  //currentPage ko be is me pass kr dia ha..or ProductAction.js me received kr ly gy is ko
  //id, currentPage, price , category ,ratings, in sub ko ProductAction me received be krna ha
  useEffect(() => {
    //alert or error used 
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(id, currentPage, price,category,ratings))
  }, [dispatch, id, currentPage, price,category,ratings,alert, error]);


  // console.log("currentPage...", currentPage);
  // console.log("resultPerPage...", resultPerPage);
  // console.log("productsCount...", productsCount);

  //-------------------Count Products----------
  let count = filteredProductsCount;
  console.log(("Count Products...........", count))

  //---------------------Price ----------------------
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <>
      <Fragment>
        {/*---------------------------------------------------- Title ----------------------------------------- */}

        <MetaData title="PRODUCTS E-COMMERCE" />


        {/*---------------------------------------------------- Products ----------------------------------------- */}

        {loading ? <Loader />
          : <>
            <Fragment>
              <h2 className="productsHeading">Products</h2>

              <div className="products">
                {/* agr products ha to chly or is me map laga k ProductCard.js me props ko pass kr dia ha */}
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>




              <div className="filterBox">
              {/*---------------------------------------------------- Price ----------------------------------------- */}
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  // valueLabelDisplay="auto"
                  // valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />
             
              {/*---------------------------------------------------- Categories  ----------------------------------------- */}


              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              {/*---------------------------------------------------- Ratings  ----------------------------------------- */}


              <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            </div>
              {/*---------------------------------------------------- Pagination ----------------------------------------- */}


              {/* resultPerPage or productsCount Backend sy a rahy ha ProductController.js sy..or is ko get reducer sy kia ha me ny */}

              {
                resultPerPage < count ?
                  <div className="paginationBox">
                    <Pagination >
                      {/* <Pagination.First onClick={currentPage} /> */}
                      <Pagination.Prev onClick={(e) => setPrvPageNo(e)} />
                      <Pagination.Item active>{currentPage}</Pagination.Item>
                      {/* <Pagination.Item>{productsCount}</Pagination.Item> */}
                      <Pagination.Next onClick={(e) => setNextPageNo(e)} />
                      {/* <Pagination.Last onClick={setLastPage} /> */}
                    </Pagination>
                  </div> : <></>

              }

            </Fragment>
          </>}







      </Fragment>



    </>
  )
}

export default Products