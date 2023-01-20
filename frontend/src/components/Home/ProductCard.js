import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';


{/* <div>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQmNkKLoOcNh3JA75Jup8jzMqRUp9uCttQw&usqp=CAU" alt="" /> 
         <img src={product.image[0].url} alt={product.name} />

       <Link className="productCard" to={`/product/${product._id}`}>
        <p>{product.name}</p>
        <div>
          <ReactStars {...options} /> <span>(256 Reviews)</span>
        </div>
        <span>{`$${product.price}`}</span>
      </Link> 
</div>  */}



const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 30 : 25,
    value: product.ratings,
    // value: 2.5,
    isHalf: true
  }


  // console.log("Product", product)
  return (
    <>

      {/* /product/${product._id}  ye ham ny path dia ha ..jb product pr click kry gy to ham ko us path me sari product show ho jy */}
      {/* jis pr ham click kr us ki id show ho jy gi  */}

      <Link className="productCard" to={`/product/${product._id}`}>
        {/* <div className="container"> */}
        {/* <div className="column"> */}
        <div className="card">
          <div className="content">
            <div className="front">
              {/* <img className="profile" width="100%" src="https://github.com/free-source-code-bd/all-public-resource/blob/main/cr7.jpg?raw=true"alt="Ronaldo" /> */}
              <img className="profile" src={product.images[0].url} alt={product.name} />
              {/* <img src={product.images[0].url} alt={product.name} className="profile" width="100%" /> */}
              <h2>{product.name}</h2>
            </div>
            <div className="back from-bottom">
              <h2>{product.name}</h2>

              <h3 className='Star_center colorChange'><ReactStars {...options} /></h3>
              {/* <h3>7</h3> */}

              <h3 > <span>({product.numOfReviews} Reviews)</span></h3>
              {/* <h3 > <span>(256 Reviews)</span></h3> */}
              {/* <h3>JUV | POR</h3> */}

              <h3 className='colorChange' ><span>{`$${product.price}`}</span>
              </h3>

              <img className="tem-img"
                src="https://github.com/free-source-code-bd/all-public-resource/blob/main/juv.jpg?raw=true" alt="" />
              &nbsp;
              <img className="tem-img"
                src="https://github.com/free-source-code-bd/all-public-resource/blob/main/port.jpg?raw=true" alt="" />
              <br />
              <p className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, in animi doloribus reprehenderit debitis
                voluptas pariatur eaque! Rem, accusamus tempora?
              </p>
              <ul className="social-icon">
                {/* <li><a ><i className="fab fa-facebook-f"></i></a></li>
                    <li><a ><i className="fab fa-instagram"></i></a></li>
                    <li><a ><i className="fab fa-twitter"></i></a></li> */}
              </ul>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}




      </Link>


    </>)
}

export default ProductCard