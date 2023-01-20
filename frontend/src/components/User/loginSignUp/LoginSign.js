
import React, { Fragment, useRef, useState, useEffect } from "react";
import './loginsign.css';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import Loader from '../../Loader/Loader';
import { useNavigate, useLocation  } from "react-router-dom";
//store sy data ko fetch krny k lia
import { useDispatch, useSelector } from "react-redux";
//userAction.js ko import kia ha me ny
import { clearErrors, login, register } from "../../../redux/action/userAction";



function LoginSign() {

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);


    // loginSubmit me is ko call krni ha 
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const containers = useRef(null);


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    //user me sy in ko fetch kia ha
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("");


    //PASSWORD SHOW
    // Initialize a boolean state
    const [passwordShown, setPasswordShown] = useState(false);
    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    // navigate('/account') is ki jga location.search lheka ha
    // location.search.split("=")[1]  is sy shipping mil jy ga agr na mily to account mil jy ga
    const redirect = location.search ? location.search.split("=")[1] : '/account'
    const pathB = location.search.split("=")[1]
    

    // console.log("./account SiginUp", account)
    // console.log("-------------------------------------")
    // console.log("redirect ------------------", redirect)
    // console.log("-------------------------------------")

    // console.log("-------------------------------------")
    // console.log("location.search --------------", pathB)
    // console.log("linkss-------------------------------------")


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (isAuthenticated) {
            // navigate('/account');
            navigate(redirect)
        }

    }, [dispatch, error, alert, isAuthenticated,redirect])

    const SignUp = () => {
        // alert("Sign Up");
        containers.current.classList.add("sign-up-mode");
    }

    const SignIn = () => {

        containers.current.classList.remove("sign-up-mode");
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        // alert("registerSubmit");
        dispatch(register(myForm));

        // setUser("")
        // setAvatarPreview("")



    };
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        // alert("Form Submit")
    };


    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };


    return (
        <>

            {loading ?
                <Loader /> :
                <>
                    <div className="containers" ref={containers}>
                        <div className="forms-containers">
                            <div className="signin-signup">

                                {/* -----------------------------------Login from-------------------------- */}
                                {/* <form action="#" className="sign-in-form" }> */}
                                <form className="form sign-in-form" ref={loginTab} onSubmit={loginSubmit}>


                                    <h2 className="title">Sign in</h2>


                                    <div className="input-field">
                                        <i className="fas fa-user"></i>
                                        <input type="email"
                                            placeholder="saqib@gmail.com"
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)} />
                                    </div>


                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            type={passwordShown ? "text" : "password"}
                                            id="show"
                                            placeholder="Password"
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}

                                        />
                                        {loginPassword ? <>
                                            <span className='eysTogglelogin'>
                                                {passwordShown ?
                                                    <i class="fa fa-eye" aria-hidden="true" onClick={togglePassword} />
                                                    : <i class="fas fa-eye-slash" onClick={togglePassword}></i>}
                                            </span>
                                        </> : <></>}

                                    </div>





                                    <Link to="/password/forgot">Forget Password ?</Link>

                                    <input type="submit" value="Login" className="btnLogin solid" />



                                    <p className="social-text">Or Sign in with E-commerce platforms</p>
                                    <div className="social-media">
                                        <a className="social-icon">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </form>

                                {/*---------------------------- Register form------------------------  */}
                                {/* <form action="#" className="sign-up-form"> */}
                                <form className="form sign-up-form"
                                    ref={registerTab}
                                    encType="multipart/form-data"
                                    onSubmit={registerSubmit}>


                                    <h2 className="title">Sign up</h2>
                                    <label for="photo-upload" class="custom-file-upload fas av">
                                        <div class="img-wrap img-upload avatarNewSizeImage">
                                            {avatarPreview ?
                                                <img src={avatarPreview} alt="Image" />
                                                :
                                                <img for="photo-upload" src="https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true" />
                                            }

                                        </div>

                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"

                                            onChange={registerDataChange}
                                            id="photo-upload"
                                        />

                                    </label>

                                    <div className="input-field">
                                        <i className="fas fa-user"></i>
                                        <input type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={registerDataChange}
                                        />
                                    </div>



                                    <div className="input-field">
                                        <i className="fas fa-envelope"></i>
                                        <input type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={registerDataChange}
                                        />
                                    </div>



                                    <div className="input-field">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            type={passwordShown ? "text" : "password"}
                                            placeholder="Password"
                                            required
                                            name="password"
                                            value={password}
                                            onChange={registerDataChange}
                                        />

                                        {password ? <>
                                            <span className='eysTogglelogin'>
                                                {passwordShown ?
                                                    <i class="fa fa-eye" aria-hidden="true" onClick={togglePassword} />
                                                    : <i class="fas fa-eye-slash" onClick={togglePassword}></i>}
                                            </span>
                                        </> : <></>}

                                    </div>
                                    {/* <img src={avatarPreview} alt="Avatar Preview" /> */}

                                    {/* <div className="input-field avaterImg">

                                        <i class="fa-solid fa-user"></i>
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                        />
                                    </div> */}





                                    <input type="submit" value="Register" className="btnLogin" />



                                    <p className="social-text">Or Sign up with E-commerce platforms</p>
                                    <div className="social-media">
                                        <a className="social-icon">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a className="social-icon">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="panels-containers">
                            <div className="panel left-panel">
                                <div className="content">
                                    <h3>New here ?</h3>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                        ex ratione. Aliquid!
                                    </p>
                                    {/* <button className="btnLogin transparent" id="sign-up-btnLogin"> */}
                                    {/* <button className="btnLogin transparent" ref={switcherTab}> */}
                                    <button className="btnLogin transparent" onClick={SignUp}>
                                        Sign up
                                    </button>
                                </div>
                                <img src="img/log.svg" className="image" alt="" />
                            </div>
                            <div className="panel right-panel">
                                <div className="content">
                                    <h3>One of us ?</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                        laboriosam ad deleniti.
                                    </p>
                                    {/* <button className="btnLogin transparent" id="sign-in-btnLogin" > */}
                                    {/* <button className="btnLogin transparent" ref={switcherTab} > */}
                                    <button className="btnLogin transparent" onClick={SignIn} >

                                        Sign in
                                    </button>
                                </div>
                                <img src="img/register.svg" className="image" alt="" />
                            </div>
                        </div>
                    </div>
                </>}




        </>
    )
}

export default LoginSign