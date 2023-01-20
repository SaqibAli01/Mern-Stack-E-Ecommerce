import React from 'react';
import './ForgotPassword.css';
import MetaData from "../../metadata/MetaData";
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, forgotPassword } from '../../../redux/action/profileAction'
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../Loader/Loader';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    // const Navigate = useNavigate();


    //profile action me sy ye 3no chahiah
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword);
    // console.log("==========================================================");
    // console.log("error.....", error);
    // console.log("Msg.....", message);
    // console.log("loading.....", loading);
    // console.log("==========================================================");

    //useState  
    const [email, setEmail] = useState("");



    //update Password
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);

        dispatch(forgotPassword(myForm));
        setEmail("")
    };




    //useEffect
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }

    }, [dispatch, error, alert, message]);



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
                                onSubmit={forgotPasswordSubmit}
                                className='updateForm'
                            >
                                <h1>Forgot Password </h1>

                                <div class="field">

                                    <label >Email</label>
                                    <span className='forgotPasswordIcon'><i class="fa-solid fa-envelope"></i></span>
                                    <input
                                        type="email"

                                        placeholder="saqib@gmail.com"
                                        required=""
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="textPaddingLeft"
                                    />


                                </div>



                                <div className='EditBtn' >
                                    <button type="submit" value="Send" class="save">Send</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </>}




        </>
    )
}

export default ForgotPassword