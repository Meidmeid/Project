import React, { useState } from "react";
import data from "./components/back/data/data";
import Header from "./components/front/header/header";
import {Routes,Route } from "react-router-dom";
import Products from "./components/front/products/products";
import Signup from "./components/front/signup/signup";
import Cart from "./components/front/cart/cart";
import Admin from "./components/front/admin/admin";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [info, setInfo] = useState([])
  // const [ loading, setLoading] = useState(true)

const handleAddUser=(dataUser)=>{
  axios.post("https://64a166050079ce56e2db0806.mockapi.io/account",dataUser)
  .then((res )=>{
    console.log(res.data);
    setInfo([...info,dataUser])
  })
  .catch((err)=>{ console.log(err)})
}
  useEffect(()=>{
    axios.get("https://64a166050079ce56e2db0806.mockapi.io/account"
    )
    .then(res => {
      // setLoading(false)
      setInfo(res.data)
    })
    .catch(res => {
      console.log(res)
    })
  },[info])

  const { productItems } = data;
  const [cartItems, setCartItems] = useState([]);

  const handleAddProduct = ( product ) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  const handleRemoveProduct = ( product ) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleCartClearance = () => {
    setCartItems([]);
  };
  // useEffect(()=>{},[cartItems])
  return (
      <div>
      <Header cartItems={cartItems}/>
      <Routes>
        <Route path="/" element={<Products productItems={productItems} handleAddProduct={handleAddProduct} />}/>
        <Route path="/signup" element={<Signup info ={info} handleAddUser={handleAddUser}/>}/>
        <Route path="/cart" element={<Cart cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} handleCartClearance={handleCartClearance}/>}/>
        <Route path="/admin" element={<Admin info ={info}/>}/>
      </Routes>

      
      </div>
  );
}

export default App;
