import React, { useContext } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Items/Item'

const ShopCategory = (props) => {
  const {allProduct} = useContext(ShopContext)
  return (
    <div className="shop-category">
      <img className='shopCategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of 36 Products
        </p>
        <div className="shipcategory-sort">
          Sort by <img src={dropdown} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {allProduct.map((item,i)=>{
          if(props.category === item.category){
            return <Item key={i} id={item.id} name={item.name}
            image = {item.image} new_price={item.new_price} old_price= {item.old_price}/>
          }else{
            return null
          }
        })}
      </div>
      <div className="load-more">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory