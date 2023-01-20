import React from 'react'
import './Header.css'
import { Link } from "react-router-dom";
import Search from '../Product/Search/Search';
// import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from '../../redux/action/userAction';
import { useNavigate } from "react-router-dom";





export default function Header() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  //profile show krwny k lia 
  const { isAuthenticated, user } = useSelector((state) => state.user);


  //logout btn k lia 
  const logouts = () => {

    navigate("/logout")
    dispatch(logout());
    alert.success("Logout SuccessFully")
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand " >E-Commerce</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link hover-2 " aria-current="page" >Home</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/products">
                  <a className="nav-link hover-2" >Products</a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-2" >Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-2" >About</a>
              </li>

              {/* Admin k lia  */}
              {isAuthenticated ? <>
                <li className="nav-item">
                  <Link to="/admin/dashboard">
                    <a className="nav-link hover-2" > Dashboard</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders">
                    <a className="nav-link hover-2" >Orders</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/account">
                    <a className="nav-link hover-2" >Account</a>
                  </Link>
                </li>
              </>
                : <></>}

            </ul>
            <form className="d-flex " role="search">

              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}

              {/* <input className="form-control me-2 hover-2" type="search" placeholder="Search" aria-label="Search" />
              <Link to="/search"> 
                <button className="btn btn-outline-success hover-2" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </Link>  */}

              <Search />



                <Link to="cart">
              <button className="btn btn-outline-success hover-2" type="submit">
  
                  {/* <i class="fa-solid fa-cart-shopping"></i> */}
                  <i class="fa-solid fa-cart-plus"></i>
                  
              </button>
                </Link>

              {/*------------------------------- Login or signup ------------------------- */}


              <div class="dropdown">
                <a class="btn btn-secondary hover-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {isAuthenticated ?
                    <img
                      className="speedDialIcon"
                      src={user.avatar.url}
                    // alt="Profile"
                    />

                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>}



                </a>
                <ul class="dropdown-menu">
                  <Link to="loginSignup">

                    {isAuthenticated ?
                      <ul style={{ paddingLeft: "0px" }}>
                        <li><a class="dropdown-item" > {user.name}</a></li>
                        <li><a class="dropdown-item" >{user.email}</a></li>
                        <li><a class="dropdown-item" onClick={logouts} >Logout</a></li>
                      </ul>
                      :
                      <li><a class="dropdown-item" >Login</a></li>}

                  </Link>


                  <li>
                    {isAuthenticated
                      ?
                      <Link to="profile"> <a class="dropdown-item"  >Profile</a></Link>
                      :
                      <Link to="loginSignup"><a class="dropdown-item"  >Profile</a> </Link>
                    }
                  </li>
                  
                  
                  <li> <Link to="/shippingss"> <a class="dropdown-item"  >Cart</a></Link></li>
                  <li> <Link to="/NewCart"> <a class="dropdown-item"  >NewCart</a></Link></li>
                  <li> <Link to="/order/confirm"> <a class="dropdown-item"  >Confirm Order</a></Link></li>
                  <li> <Link to="/process/payment"> <a class="dropdown-item"  >payment</a></Link></li>
                  
            
                  {/* <li><a class="dropdown-item" >Something else here</a></li> */}
                </ul>



              </div>

            </form>
          </div>
        </div>
      </nav>












    </>
  )
}
