import React, {useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { useSnackbar } from 'notistack';

const Add = () => {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
        price: 0,
    });
    const {enqueueSnackbar} = useSnackbar()

    const handleChange = (event) => {
        const name= event.target.name;
        const value = event.target.value;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async(event) => {
        try{
            event.preventDefault();
            let formData = new FormData()
            const {name, description, price, category} = data
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("image", image)
            const response = await axios.post(`${import.meta.env.VITE_URL}/api/food/add`,formData)
            if(response.data.success){
                setData({
                  name: "",
                  description: "",
                  price: "",
                  category: "Salad",
                  price: 0,
                });
                setImage(false)
                enqueueSnackbar(response.data.message,{
                    variant: "success"
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
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            required
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            name="description"
            row="6"
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={handleChange}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={handleChange} value={data.price} type="Number" name="price" placeholder="$20" required />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add