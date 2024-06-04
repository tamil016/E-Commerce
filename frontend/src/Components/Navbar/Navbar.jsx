import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import Cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu, setMenu] = useState('shop')
  const {getTotalCartItems} = useContext(ShopContext)
  const menuRef = useRef()

  const dropdown = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }

  return (
    <div className="navbar">
      <Link to='/' style={{textDecoration:"none"}}>
        <div className="nav-logo" onClick={()=>setMenu('shop')}>
          <img src={logo} alt="" />
          <p>SHOPIFY</p>
        </div>
      </Link>
      <i class="fa-solid fa-circle-chevron-down" onClick={dropdown}></i>
      <ul className="nav-menu" ref={menuRef}>
        <li onClick={()=>setMenu('shop')}><Link to="/" style={{textDecoration:"none"}}>SHOP</Link> {menu === 'shop'? <hr /> : <></>}</li>
        <li onClick={()=>setMenu('men')}><Link to="/men" style={{textDecoration:"none"}}>MEN</Link> {menu === 'men'? <hr/> : <></>}</li>
        <li onClick={()=>setMenu('women')}><Link to = "/women" style={{textDecoration:"none"}}>WOMEN </Link>{menu === 'women'? <hr/> : <></>}</li>
        <li onClick={()=>setMenu('kid')}><Link to="/kid" style={{textDecoration:"none"}}>KIDS</Link>{menu === 'kid'? <hr/> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button> : <Link to="/login"><button>Login</button></Link>}
        
        <Link to="/cart"><img src={Cart_icon} alt="" /></Link>
        <div className="nav-cart-count">
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  )
}

export default Navbar
