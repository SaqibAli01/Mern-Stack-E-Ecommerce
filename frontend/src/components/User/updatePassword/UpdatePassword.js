import React from 'react';
import './UpdatePassword.css';
import MetaData from "../../metadata/MetaData";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updatePassword } from '../../../redux/action/profileAction'
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../../redux/constant/profileConstance';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();

    //backend sy user chahia bus
    // const { user } = useSelector((state) => state.user);

    //profile action me sy ye 3no chahiah
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    // console.log("----Profile----",useSelector((state) => state.profile))
    // console.log("==========================================================");
    // console.log("error.....", error);
    // console.log("isUpdated.....", isUpdated);
    // console.log("loading.....", loading);
    // console.log("==========================================================");

    //password useState
     // "oldPassword": "password",
    // "newPassword": "password1",
    // "confirmPassword": "password1" 
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setNewConfirmPassword] = useState("");


   
    // Initialize a boolean state
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [passwordShown3, setPasswordShown3] = useState(false);




    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2);
    };
    const togglePassword3 = () => {
        setPasswordShown3(!passwordShown3);
    };

    //update Password
    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));

    };




    //useEffect
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success(" Updated Password Successfully");
            Navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, Navigate, isUpdated]);

    return (
        <>
            <MetaData title="Update Password" />
            {loading
                ?
                <Loader />
                :
                <>
                    <div className='main_card'>

                        <div class="EditCard">
                            <form
                                // encType="multipart/form-data"
                                onSubmit={updatePasswordSubmit}
                                className='updateForm'
                            >
                                <h1>Update Password </h1>

                                <div class="field">

                                    <label >Old Password:</label>
                                    <span className='updatePasswordIcon'><i class="fa-solid fa-unlock"></i></span>
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        maxlength="20"
                                        placeholder="Old Password"
                                        required=""
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="textPaddingLeft"
                                    />
                                    {oldPassword ? <>
                                        <span className='eysToggle'>
                                        {passwordShown ?
                                            <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={togglePassword}></span>
                                            : <i class="fas fa-eye-slash" onClick={togglePassword}></i>}
                                    </span>
                                    </> 
                                    : <></>}
                                    
                                </div>

                                <div class="field">
                                    <label>New Password:</label>
                                    <span className='updatePasswordIcon'><i class="fa-solid fa-lock"></i></span>

                                    <input                   
                                        type={passwordShown2 ? "text" : "password"}
                                        maxlength="20"
                                        placeholder="New Password"
                                        required=""
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="textPaddingLeft"
                                    />
                                    {newPassword ? <>
                                        <span className='eysToggle'>
                                        {passwordShown2 ?
                                            <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={togglePassword2}></span>
                                            : <i class="fas fa-eye-slash" onClick={togglePassword2}></i>}
                                    </span>
                                    </> : <></>}
                                    
                                </div>
                                <div class="field">
                                    <label >Confirm New Password:</label>
                                    <span className='updatePasswordIcon'><i class="fa-solid fa-lock"></i></span>

                                    <input
                                       
                                        type={passwordShown3 ? "text" : "password"}
                                        maxlength="20"
                                        placeholder="Confirm New Password"
                                        required=""
                                        value={confirmPassword}
                                        onChange={(e) => setNewConfirmPassword(e.target.value)}
                                        className="textPaddingLeft"
                                    />
                                    {confirmPassword ? 
                                    <>
                                     <span className='eysToggle'>
                                        {passwordShown3 ?
                                            <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={togglePassword3}></span>
                                            : <i class="fas fa-eye-slash" onClick={togglePassword3}></i>}
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

export default UpdatePassword