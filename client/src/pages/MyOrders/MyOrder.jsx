import React, {useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreProvider'

const MyOrder = () => {
    const [data, setData] = useState([])
    const {token} = useContext(StoreContext)
    const fetchOrders = async() => {
        try{
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/order/userorders`,
              {},{headers: {token: localStorage.getItem("token")}}
            );
            if(response.data.success){
                setData(response.data.data)
            }
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (token) {
          fetchOrders();
        }
    },[token])

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order, index) => {
                    return(
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {
                                    order.items.map((item, indexItem) => {
                                        if(indexItem === order.items.length - 1){
                                            return item.name+" x "+item.quantity
                                        }
                                        else{
                                            return item.name+" x "+item.quantity+", "
                                        }
                                    })
                                }
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length} </p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrder