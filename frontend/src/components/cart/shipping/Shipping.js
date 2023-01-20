import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { useNavigate} from "react-router-dom";

import MetaData from "../../metadata/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import CheckoutSteps from "../checkOutStage/CheckoutSteps";
import { saveShippingInfo } from "../../../redux/action/cartAction";

//import for phone no
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// import CheckOutStage from "../checkOutStage/CheckOutStage";

const Shipping = () => {


  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();



  //ye cart reducer me bani ha shippingInfo: {} phir store me call kr di ha
  const { shippingInfo } = useSelector((state) => state.cart);
  // console.log("-------------------------------------")
  // console.log("shippingInfo", shippingInfo);
  // console.log("-------------------------------------")

  //----------------------------useState------------------------------
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  // const [value, setValue] = useState()

  console.log("-------------------------------------")
  console.log("address", address);
  console.log("city", city);
  console.log("state", state);
  console.log("country", country);
  console.log("pinCode", pinCode);
  console.log("phoneNo", phoneNo);
  console.log("-------------------------------------")


  //submit shipping 
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 15) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };


  return (
    <>
      <Fragment>
        <MetaData title="Shipping Details" />
        <CheckoutSteps activeStep={0} />

        <div className="shippingContainer">
          <div className="EditCard newEditCard">
            <div className="shippingBox">
              <h2 className="shippingHeading">Shipping Details</h2>
              <form
                className="shippingForm "
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div>
                  <HomeIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>



                <div>
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <PinDropIcon />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>

                <div className="PhoneNos">
                  {/* <div className="PhoneNos"> */}
                  {/* <PhoneIcon /> */}
                  {/* <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    size="10"
                  /> */}

                  <PhoneInput
                    international
                    defaultCountry="PK"
                    // value={value}
                    // onChange={setValue} 
                    value={phoneNo}
                    // onChange={(e) => setPhoneNo(e.target.value)}
                    onChange={setPhoneNo}
                    placeholder="Phone Number"
                    size="10"

                  />
                </div>

                <div>
                  <PublicIcon />

                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {/* Ye Country opr import ki ha  */}
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                {/* ye country useState wala lagia ha q user khod phaly sy country select kr skta ha */}
                {country && (
                  <div>
                    <TransferWithinAStationIcon />

                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* agr state ho gi to true ho  */}

                {/* <input
                type="submit"
                value="Continue"
                className="shippingBtn"
                disabled={state ? false : true}
              /> */}
                <div className='EditBtn EditBtns' >
                  <button
                    type="submit"
                    value="Continue"
                    className="save" disabled={state ? false : true}>Continue </button>
                </div>

                
              </form>

            </div>
          </div>
        </div>

      </Fragment>

    </>)
}

export default Shipping