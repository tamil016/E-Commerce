import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DiscriptionBox from '../Components/DiscriptionBox/DiscriptionBox'
import RelatedProduct from '../Components/RelatedProducts/RelatedProduct'

const Product = () => {
    const {allProduct} = useContext(ShopContext)
    const {productId} = useParams()
    console.log(productId);
    const product = allProduct.find((item)=> item.id === Number(productId))
  return (
    <div className="product">
        <Breadcrums product = {product}/>
        <ProductDisplay product={product}/>
        <DiscriptionBox/>
        <RelatedProduct/>
    </div>
  )
}

export default Product