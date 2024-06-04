import React, { createContext, useEffect, useState } from "react";
// import allProduct from '../Components/Assets/all_product'

export const ShopContext = createContext(null)
const getDefaultCart = ()=>{
    let cart = {};
    for(let i=0 ; i < 300+1 ; i++){
        cart[i] = 0
    }
    return cart
}
const ShopContextProvider = (props)=>{

    const [allProduct, setAllProduct] = useState([])

    const [cartItem, setCartItems] = useState(getDefaultCart())

    useEffect(()=>{
        fetch('http://localhost:8080/allproducts').then((res)=>res.json()).then((data)=>setAllProduct(data))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/getcart',{
                method : "POST",
                headers : {
                    Accept : "application/formdata",
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-Type' : 'application/json'
                },
                body : ''
            }).then(res => res.json()).then(data=> setCartItems(data))
        }
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/addtocart',{
                method : "POST",
                headers : {
                    Accept : "application/formdata",
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({"itemId" : itemId})
            }).then(res=>res.json()).then(data=>console.log(data))
        }
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/removefromcart',{
                method : "POST",
                headers : {
                    Accept : "application/formdata",
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({"itemId" : itemId})
            }).then(res=>res.json()).then(data=>console.log(data))
        }
    }

    const getToalCartAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = allProduct.find((product)=>product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItem[item]
            }  
        }
        return totalAmount
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0
        for(const item in cartItem){
            if(cartItem[item]>0){
                totalItem += cartItem[item]
            }
        }
        return totalItem
    }

    const contextValue = {getTotalCartItems, getToalCartAmount ,allProduct, cartItem, addToCart, removeFromCart}

    console.log(cartItem);
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider