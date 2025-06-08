import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Productdisplay from './Productdisplay';
import '../styles/Products.css'


const purl = 'https://agriapi2025.onrender.com//api/products';

const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get(`${purl}`)
      .then(res => {
        console.log("API Response:", res.data.data); // This should log the array of products
        setProduct(res.data.data);
      })
      .catch(err => {
        alert(err.message);
        console.error("Error fetching data:", err);
      });
  }, [])
  return (
    <div className='products_continer'>
      <Productdisplay productdata={product} />
    </div>
  )
}

export default Products