import React from 'react';
import './UpdatesProfile.css';
import MetaData from "../../metadata/MetaData";
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateProfile } from '../../../redux/action/profileAction'
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { useEffect } from 'react';
import { UPDATE_USER_RESET } from '../../../redux/constant/profileConstance';
import { loadUser } from '../../../redux/action/userAction';
import Loader from '../../Loader/Loader'


const UpdateProfiles = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  //backend sy user chahia bus
  const { user } = useSelector((state) => state.user);

  //profile action me sy ye 3no chahiah
  const { error, isUpdated, loading } = useSelector((state) => state.profile);



  //user jo opr import kia ha is me user ka name or email chahia
  // const [name, setName] = useState(user.name);
  // const [email, setEmail] = useState(user.email);

  //user.name or user.email in useEffect me use b kr skty if condition me
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //image k lia useState bnai 
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('./Profile.png');



  //update profile
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };


  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  //useEffect
  useEffect(() => {

    //useState
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {

      alert.success("Profile Updated Successfully");

      //ui update ho jy for exp: Refresh ho jy 
      dispatch(loadUser());
      //update ho k account's me  puch ho jy
      Navigate(`/account`);
      dispatch({ type: UPDATE_USER_RESET });
    }

  }, [dispatch, error, alert, Navigate, user, isUpdated])


  return (
    <>
      <MetaData title="Update Profile" />
      {loading
        ?
        <Loader />
        :
        <>
          <div className='main_card'>

            <div class="EditCard">
              <form
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
                className='updateForm'
              >
                <h1>Edit Profile </h1>


                <label for="photo-upload" class="custom-file-upload fas">
                  <div class="img-wrap img-upload">
                    <img for="photo-upload" src={avatarPreview} />
                    {/* <img for="photo-upload" src="https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true" /> */}
                    {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                  </div>

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    id="photo-upload"
                  />

                </label>


                <div class="field"><label for="name">Name:</label>

                  <input
                    id="name"
                    type="text"
                    maxlength="25"
                    placeholder="Saqib Ali"
                    required=""
                    value={name}
                    // onChange={updateProfileSubmit}
                    onChange={(e) => setName (e.target.value)}
                  />

                </div>

                <div class="field"><label for="status">Email:</label>

                  <input id="status"
                    type="text"
                    maxlength="35"
                    placeholder="saqib@gmail.com"
                    required=""
                    value={email}
                    // onChange={updateProfileSubmit}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>


                <div className='EditBtn' >
                  <button type="submit" class="save">Update </button>

                </div>
              </form>
            </div>
          </div>
        </>}




    </>
  )
}

export default UpdateProfiles