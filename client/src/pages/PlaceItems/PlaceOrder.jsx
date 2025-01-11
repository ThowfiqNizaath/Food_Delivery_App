import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreProvider";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItem, token } = useContext(StoreContext);
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: "",
  });

  useEffect(() => {
    if(!token || getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[])

  const placeOrder = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      food_list.map((item) => {
        if (cartItem[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id];
          orderItems.push(itemInfo);
        }
      })
      const orderData = {
         items: orderItems,
         amount: getTotalCartAmount()+5,
         address: data
      }
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/order/place`,orderData,{headers:{token}});
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }
      else{
        alert("error")
      }
    } catch (err) {
      console.log("place Order Error: ", err);
    }
  };

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            required
            name="firstname"
            onChange={onChangeHandler}
            value={data.firstname}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
        />
        <input
          required
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-field">
          <input
            required
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
          />
          <input
            required
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-field">
          <input
            required
            type="number"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
          />
          <input
            required
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          type="number"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
              </b>
            </div>
          </div>
          <button type="submit" onClick={() => navigate("/order")}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
