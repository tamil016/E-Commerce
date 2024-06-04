import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import remove from '../../assets/cross_icon.png'

const Listproduct = () => {

  const [allProducts, setAllProducts] = useState([])

  const fetchData = async () => {
    await fetch('http://localhost:8080/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  const removeProduct = async(id)=>{
    await fetch('http://localhost:8080/removeproduct',{
      method : 'POST',
      headers : {
        Accept : 'application/json',
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify({id : id})
    })
    await fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <>
              <div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className='listproduct-product-icon' />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeProduct(product.id)}} src={remove} alt="" className="listproduct-remove-icon" />
              </div>
              <hr />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Listproduct