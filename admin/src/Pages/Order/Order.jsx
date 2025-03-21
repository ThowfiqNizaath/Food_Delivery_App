import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import {useSnackbar} from "notistack"
const Order = () => {
  const [data, setData] = useState([])
  const {enqueueSnackbar} = useSnackbar()
  useEffect(() => {
     fetchOrders()
  },[])

  const fetchOrders = async() => {
     try{
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/order/list`);
        if(response.data.success){
          setData(response.data.data)
        }
     }catch(err){
      console.log(err)
     }
  }

  const handleUpdateStatus = async(event, orderId) => {
    try{
       const response = await axios.post(import.meta.env.VITE_URL+'/api/order/status',{orderId, status: event.target.value})
       if(response.data.success){
        fetchOrders()
        enqueueSnackbar(response.data.message, {variant: "success"})
       }
    }catch(err){
      console.log(err)
      enqueueSnackbar(response.data.message, { variant: "error" });
    }
  }

  return (
    <div className="order add">
      <h2>Order Page</h2>
      <div className="order-list">
        {data.length === 0 ? (
          <h1 className="list-nofood">
            {" "}
            No Orders Available!{" "}
          </h1>
        ) : (
          data.reverse().map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstname} {order.address.lastname}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-phone">{order.address.phone}</p>
              </div>
              <p className="order-items">Item: {order.items.length}</p>
              <p className="order-amount">${order.amount}</p>
              <select
                onChange={(e) => handleUpdateStatus(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order