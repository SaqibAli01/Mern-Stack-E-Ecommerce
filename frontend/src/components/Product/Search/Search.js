import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../metadata/MetaData";


import "./Search.css";


const Search = () => {
    const navigate = useNavigate();
    // console.log("useNavigate", navigate)
    const [keyword, setKeyword] = useState("");

    const SearchSubmitHandler = (e) => {
        e.preventDefault();
        //trim ka matlib ha space na ay
        if (keyword.trim()) {
            // alert(`/products/${keyword}`)
            navigate(`/products/${keyword}`);
            setKeyword("");
        } else {
            // alert(`products......`)
            navigate("/products");
            setKeyword("");

        }
    };

    return (
        <Fragment>
            <MetaData title="SEARCH A PRODUCT -- E-COMMERCE" />
            
            {/* <form className="searchBox" onSubmit={SearchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form> */}

            <form className="d-flex " role="search">


                <input type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    className="form-control me-2 hover-2"
                    aria-label="Search" />

                <button type="submit" value="Search" onClick={SearchSubmitHandler} className="btn btn-outline-success hover-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
            </form>
        </Fragment>
    );
};

export default Search;