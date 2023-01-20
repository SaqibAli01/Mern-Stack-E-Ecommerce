import React from 'react';
import './ResetPassword.css';
import MetaData from "../../metadata/MetaData";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, resetPassword } from '../../../redux/action/profileAction'
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();
    const routeParams = useParams();
    console.log("==========================================================");
    console.log("routeParams...", routeParams.token)
    console.log("==========================================================");
   
    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
      );
    // console.log("----Profile----",useSelector((state) => state.forgotPassword))
    console.log("==========================================================");
    console.log("error.....", error);
    console.log("success.....", success);
    console.log("loading.....", loading);
    console.log("==========================================================");

    //Backend waly name lia ha
     // "password": "password",
    // "confirmPassword": "confirmPassword",
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


   
    // Initialize a boolean state
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2);
    };
    

    //update Password
    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(routeParams.token ,myForm));

    };




    //useEffect
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success(" Updated Password Successfully");
            Navigate("/loginSignup");
        }
    }, [dispatch, error, alert, Navigate, success]);

    return (
        <>
            <MetaData title="Reset Password" />
            {loading
                ?
                <Loader />
                :
                <>
                    <div className='main_card'>

                        <div class="EditCard">
                            <form
                                // encType="multipart/form-data"
                                onSubmit={resetPasswordSubmit}
                                className='updateForm'
                            >
                                <h1> Reset Password </h1>

                                <div class="field">

                                    <label >New Password:</label>
                                    <span className='updatePasswordIcon'><i class="fa-solid fa-unlock"></i></span>
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        maxlength="20"
                                        placeholder="New Password"
                                        required=""
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="textPaddingLeft"
                                    />
                                    {password ? <>
                                        <span className='eysToggle'>
                                        {passwordShown ?
                                            <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={togglePassword}></span>
                                            : <i class="fas fa-eye-slash" onClick={togglePassword}></i>}
                                    </span>
                                    </> 
                                    : <></>}
                                    
                                </div>

                                <div class="field">
                                    <label>Confirm Password:</label>
                                    <span className='updatePasswordIcon'><i class="fa-solid fa-lock"></i></span>

                                    <input                   
                                        type={passwordShown2 ? "text" : "password"}
                                        maxlength="20"
                                        placeholder="Confirm Password"
                                        required=""
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="textPaddingLeft"
                                    />
                                    {confirmPassword ? <>
                                        <span className='eysToggle'>
                                        {passwordShown2 ?
                                            <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={togglePassword2}></span>
                                            : <i class="fas fa-eye-slash" onClick={togglePassword2}></i>}
                                    </span>
                                    </> : <></>}
                                    
                                </div>

                               


                                <div className='EditBtn' >
                                    <button type="submit" value="Update" class="save">Update </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </>}




        </>
    )
}

export default ResetPassword