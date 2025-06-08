import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Components/Sidebar';
import './css/productList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editVariantId, setEditVariantId] = useState(null);
    const [formValues, setFormValues] = useState({ price: '', quantity: '' });
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://agriapi2025.onrender.com//api/products');
                setProducts(res.data.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchProducts();
    }, []);

    const handleEdit = (variant) => {
        setEditVariantId(variant.id);
        setFormValues({ price: variant.price, quantity: variant.quantity });
        setImage(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (variantId) => {
        const formData = new FormData();
        formData.append('price', formValues.price);
        formData.append('quantity', formValues.quantity);
        if (image) formData.append('image', image);

        try {
            await axios.put(`https://agriapi2025.onrender.com//api/update-variant`, formData);
            alert("Variant updated");
            setEditVariantId(null);
            // Refresh data
            const res = await axios.get('https://agriapi2025.onrender.com//api/products');
            setProducts(res.data.data);
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    const handleDelete = async (variantId) => {
        try {
            await axios.delete(`https://agriapi2025.onrender.com//api/delete-variant`);
            alert("Variant deleted");
            setProducts(prev => prev.map(p => ({
                ...p,
                variants: p.variants.filter(v => v.id !== variantId)
            })));
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };

    return (
        <div className='product_list_container'>
            <Sidebar />
            <h2 className="page-title">Manage Products and Variants</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Variant - Qty</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) =>
                        product.variants.map((variant, vIndex) => (
                            <tr key={variant.id}>
                                {vIndex === 0 && (
                                    <>
                                        <td rowSpan={product.variants.length}>{index + 1}</td>
                                        <td rowSpan={product.variants.length}>{product.pname}</td>
                                        <td rowSpan={product.variants.length}>{product.description}</td>
                                        <td rowSpan={product.variants.length}>{product.category}</td>
                                    </>
                                )}
                                <td>
                                    {editVariantId === variant.id ? (
                                        <input
                                            name="quantity"
                                            type="number"
                                            min="0"
                                            value={formValues.quantity}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        variant.quantity
                                    )}
                                </td>
                                <td>
                                    {editVariantId === variant.id ? (
                                        <input
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formValues.price}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        variant.price
                                    )}
                                </td>
                                <td>
                                    <img
                                        src={`https://agriapi2025.onrender.com//uploads/${variant.image}`}
                                        alt="Variant"
                                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                                    />
                                    {editVariantId === variant.id && (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setImage(e.target.files[0])}
                                        />
                                    )}
                                </td>
                                <td>
                                    {editVariantId === variant.id ? (
                                        <>
                                            <button onClick={() => handleUpdate(variant.id)}>Save</button>
                                            <button onClick={() => setEditVariantId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(variant)}>Edit</button>
                                            <button onClick={() => handleDelete(variant.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;

