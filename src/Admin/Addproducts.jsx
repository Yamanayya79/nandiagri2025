import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import './css/Addproducts.css'
const Addproducts = () => {
  const [pname, setPname] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [brand, setBrand] = useState('');
  const [availableLocations, setAvailableLocations] = useState('');
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([{ quantity: '', acre: '', price: '', old_price: '', discount: '', stock: '' }]);
  const [categories, setCategories] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    // Fetch categories
    axios.get('https://agriapi2025.onrender.com/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error loading categories", err));
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleVariantChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index][e.target.name] = e.target.value;
    setVariants(newVariants);
  };

  const addVariantField = () => {
    setVariants([...variants, { quantity: '', acre: '', price: '', old_price: '', discount: '', stock: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please select at least one image");

    const formData = new FormData();
    formData.append('pname', pname);
    formData.append('description', description);
    formData.append('category_id', categoryId);
    formData.append('delivery_time', deliveryTime);
    formData.append('brand', brand);
    formData.append('available_locations', availableLocations);
    formData.append('variants', JSON.stringify(variants));
    images.forEach((img) => formData.append('images', img));

    try {
      const res = await axios.post('https://agriapi2025.onrender.com/api/add-product', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error adding product", err);
      alert("Error adding product");
    }
  };


// useEffect(() => {
//   axios.get('https://agriapi2025.onrender.com/api/admin/check-session', { withCredentials: true })
//     .then(res => {
//       if (!res.data.success) {
//         navigate('/admin/login'); // If not logged in, redirect
//       }
//     })
//     .catch(err => {
//       // Handle 401 Unauthorized or other errors
//       if (err.response && err.response.status === 401) {
//         navigate('/admin/login'); // Redirect if session invalid
//       } else {
//         console.error('Error checking admin session:', err);
//       }
//     });
// }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }} className='add-products-continer'>
      <Sidebar />
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Product Name" value={pname} onChange={e => setPname(e.target.value)} required />
        <br /><br />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <br /><br />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <br /><br />
        <input type="text" placeholder="Delivery Time" value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)} required />
        <br /><br />
        <input type="text" placeholder="brand name " value={brand} onChange={e => setBrand(e.target.value)} required />
        <br /><br />
        <input type="text" placeholder="Available Locations" value={availableLocations} onChange={e => setAvailableLocations(e.target.value)} required />
        <br /><br />
        <p>Min-2 image</p>
        <input type="file" multiple onChange={handleImageChange} accept="image/*" />
        <br /><br />

        <h4>Variants</h4>
        {variants.map((variant, index) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <input type="text" name="quantity" placeholder="Quantity" value={variant.quantity} onChange={e => handleVariantChange(index, e)} required />
            <input type="text" name="acre" placeholder="Acre" value={variant.acre} onChange={e => handleVariantChange(index, e)} required />
            <input type="number" name="price" placeholder="Price" value={variant.price} onChange={e => handleVariantChange(index, e)} required />
            <input type="number" name="old_price" placeholder="Old Price" value={variant.old_price} onChange={e => handleVariantChange(index, e)} />
            <input type="text" name="discount" placeholder="Discount" value={variant.discount} onChange={e => handleVariantChange(index, e)} />
            <input type="text" name="stock" placeholder="Stock" value={variant.stock} onChange={e => handleVariantChange(index, e)} />
          </div>
        ))}
        <button type="button" onClick={addVariantField}>Add Another Variant</button>
        <br /><br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Addproducts;
