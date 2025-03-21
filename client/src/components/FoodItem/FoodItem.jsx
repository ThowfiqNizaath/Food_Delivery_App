import React, { useContext} from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../Context/StoreProvider'

const FoodItem = ({ item
  // id, name, price, description, image
}) => {
    const {cartItem, addToCart, removeFromCart} = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${import.meta.env.VITE_SERVER_URL}/api/food/image/${item?.image}`}
          alt={item?.image}
        />
        {!cartItem[item?._id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(item._id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(item?._id)}
              src={assets.remove_icon_red}
              className="remove"
            />
            <p>{cartItem[item?._id]}</p>
            <img
              onClick={() => addToCart(item?._id)}
              src={assets.add_icon_green}
              className="add-green"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{item?.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{item?.description}</p>
        <p className="food-item-price">${item?.price}</p>
      </div>
    </div>
  );
}

export default FoodItem