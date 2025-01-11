import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        fetchCartData(localStorage.getItem("token"));
      }
    };
    loadData();
  }, []);

  const fetchFoodList = async () => { 
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/food/list`
      );
      if (response.data.data) {
        setFoodList(response.data.data);
      } else {
        console.log("Data not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async(id) =>{
    if (!cartItem[id]) {
      setCartItem((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setCartItem((prev) => ({
        ...prev,
        [id]: prev[id] + 1,
      }));
    }
    if(token){
       const response = await axios.post(`${import.meta.env.VITE_SERVER_URL }/api/cart/add`,{itemId: id},{headers:{token}})
    }
  };

  const removeFromCart = async(id) => {
    setCartItem((prev) => ({ ...prev, [id]: prev[id] - 1 }));
     if(token){
       const response = await axios.post(`${import.meta.env.VITE_SERVER_URL }/api/cart/remove`,{itemId: id},{headers:{token}})
    }
  };

  const fetchCartData = async(token) => {
      try{
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/get`,{},{headers:{token}})
        if(response.data.success){
          setCartItem(response.data.data)
        }
      }catch(err){
        console.log(err)
      }
  }

  const getTotalCartAmount = () => {
    let totalAmout = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmout += itemInfo.price * cartItem[item];
      }
    }
    return totalAmout;
  };

  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItem,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
