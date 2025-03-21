import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreProvider'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {food_list.length === 0 && (
        <h2 className="food_list_meassage">
          {" "}
          Server is under process. Please try again later!{" "}
        </h2>
      )}
      <div className="food-display-list">
        {food_list.length !== 0 &&
          food_list?.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  item={item}
                  // id={item._id}
                  // name={item.name}
                  // price={item.price}
                  // description={item.description}
                  // image={item.image}
                />
              );
            }
          })}
      </div>
    </div>
  )
}
export default FoodDisplay