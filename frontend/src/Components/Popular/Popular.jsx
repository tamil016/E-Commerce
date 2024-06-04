import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Items/Item'

const Popular = () => {

  const [popular_product, set_popular_product] = useState([])

  useEffect(()=>{
    fetch('http://localhost:8080/popularinwomen').then(res=>res.json()).then(data=>set_popular_product(data))
  },[])
  return (
    <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popular_product.map((item, i)=>{
                return(
                    <Item key={i} id={item.id} name={item.name}
                    image = {item.image} new_price={item.new_price} old_price= {item.old_price}/>
                )
            })}
        </div>
    </div>
  )
}

export default Popular