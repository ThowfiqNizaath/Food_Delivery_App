import React, { useContext} from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../Context/StoreProvider'

const FoodItem = ({id, name, price, description, image}) => {
    const {cartItem, addToCart, removeFromCart} = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${import.meta.env.VITE_SERVER_URL}/image/${image}`}
          alt=""
        />
        {!cartItem[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              className="remove"
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              className="add-green"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem