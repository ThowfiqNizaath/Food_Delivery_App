import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { useSnackbar } from 'notistack'
const List = () => {
  const [data, setData] = useState([])
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async() => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/food/list`)
      if(response.data.success){
        setData(response.data.data)
      }else{
        enqueueSnackbar(response.data.message, {variant: 'error'})
      }
    }catch(err){
      console.log(err)
    }
  }

  const removeData = async(id) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/food/remove`,{id: id})
      await fetchData();
      if(response.data.success){
        enqueueSnackbar(response.data.message, {
          variant: 'success'
        })
      }else{
        enqueueSnackbar(response.data.message, {
          variant: "error",
        });
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
           data.length === 0 ? <h1 className="list-nofood"> No Food Available! Please Add Foods. </h1> : data.map((item, index) => {
            return(
              <div key={index} className="list-table-format">
                <img src={`${import.meta.env.VITE_URL}/api/food/image/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="list-remove" onClick={() => removeData(item._id)}>Remove</p>
              </div>
            )
           })
        }
      </div>
    </div>
  )
}

export default List