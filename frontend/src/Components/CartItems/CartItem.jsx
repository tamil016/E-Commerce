import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import removeicon from '../Assets/cart_cross_icon.png'


const CartItem = () => {

    const {getToalCartAmount, allProduct, cartItem,  removeFromCart} = useContext(ShopContext)


    return (
        <div className="cartitems">
            <div className="main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {allProduct.map((item) => {
                if (cartItem[item.id] > 0) {
                    return <div>
                        <div className="cartitem-format-main main">
                            <img src={item.image} alt="" className='carticon' />
                            <p>{item.name}</p>
                            <p>${item.new_price}</p>
                            <button className='cartquantity'>{cartItem[item.id]}</button>
                            <p>${item.new_price * cartItem[item.id]}</p>
                            <img className='cartitemremove' src={removeicon} alt="" onClick={() => { removeFromCart(item.id) }} />
                        </div>
                        <hr />
                    </div>
                }
                return null
            })}
            <div className="cartitems-down">
                <div className="cartitemstotal">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Subtotal</p>
                            <p>${getToalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cartitem-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartitem-total-item'>
                            <h3>Total</h3>
                            <h3>${getToalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have promocode, Enter it here</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='Promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem