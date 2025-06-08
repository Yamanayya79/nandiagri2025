import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/productList.css';
import Sidebar from './Components/Sidebar';

const ManageCategory = () => {
    const [products, setProducts] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        cat_des: '',
    });

    useEffect(() => {
        axios.get('https://agriapi2025.onrender.com//api/categories')
            .then(res => {
                console.log("API Response:", res.data); // Log the entire response
                // Since the response is an array, set products directly
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else {
                    setError("Unexpected response structure");
                }
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data");
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://agriapi2025.onrender.com//api/delete-categories/${id}`)
            .then(res => {
                alert('Category deleted successfully!');
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(err => alert('Failed to delete product!'));
    };

    const handleEditClick = (product) => {
        setEditProduct(product.id);
        setFormValues({
            name: product.name,
            cat_des: product.cat_des,
        });
        setImage(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleUpdate = (id) => {
        const updatedData = new FormData();
        updatedData.append('name', formValues.name);
        updatedData.append('cat_des', formValues.cat_des);
        if (image) {
            updatedData.append('cat_img', image);
        }

        axios.put(`https://agriapi2025.onrender.com//api/update-categories/${id}`, updatedData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                alert('category updated successfully');
                setProducts(products.map(p => (p.id === id ? { ...p, ...formValues, cat_img: image ? image.name : p.cat_img } : p)));
                setEditProduct(null);
            })
            .catch(err => alert('Update failed'));
    };

    return (
        <div className='product_list_continer'>
            <Sidebar />
            <h2 className="page-title">Manage Categorys</h2>
            {error && <p className="error">{error}</p>}
      <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(products) && products.map(data => (
                        <tr key={data.id}>
                            <td>{editProduct === data.id ? <input name="id" value={data.id} readOnly /> : data.id}</td>
                            <td>
                                {editProduct === data.id ? (
                                    <input name="name" value={formValues.name} onChange={handleChange} />
                                ) : (
                                    data.name
                                )}
                            </td>
                            <td>
                                {editProduct === data.id ? (
                                    <input name="cat_des" value={formValues.cat_des} onChange={handleChange} />
                                ) : (
                                    data.cat_des
                                )}
                            </td>
                            <td>
                                {data.cat_img && (
                                    <img src={`https://agriapi2025.onrender.com//uploads/${data.cat_img}`} alt="preview" style={{ width: '60px' }} />
                                )}
                                {editProduct === data.id && (
                                    <input type='file' onChange={(e) => setImage(e.target.files[0])} />
                                )}
                            </td>
                            <td>
                                {editProduct === data.id ? (
                                    <button onClick={() => handleUpdate(data.id)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(data)}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(data.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>

    );
};

export default ManageCategory;
