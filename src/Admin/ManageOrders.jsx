import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ManageOrders.css';
import Sidebar from './Components/Sidebar';
import './css/ManageOrders.css'; // Add custom styles here

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    mobile: '',
    address: '',
    payment_method: '',
    payment_status: '',
    total_amount: ''
  });

  useEffect(() => {
    axios.get('https://agriapi2025.onrender.com//api/orders')
      .then(res => setOrders(res.data.data))
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Failed to fetch orders.");
      });
  }, []);

  const handleEditClick = (order) => {
    setEditOrderId(order.id);
    setFormValues({
      name: order.name,
      phone: order.phone,
      address: order.address,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      total_amount: order.total_amount,
      order_status: order.order_status
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (id) => {
    axios.put(`https://agriapi2025.onrender.com//update-order/${id}`, formValues)
      .then(() => {
        alert('Order updated successfully');
        setOrders(orders.map(order => (
          order.id === id ? { ...order, ...formValues } : order
        )));
        setEditOrderId(null);
      })
      .catch(err => {
        console.error(err);
        alert('Update failed');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://agriapi2025.onrender.com//api/delete-order/${id}`)
      .then(() => {
        alert('Order Deleted successfully!');
        setOrders(orders.filter(order => order.id !== id));
      })
      .catch(err => alert('Delete failed'));
  };

  return (
    <div className="product_list_continer">
      <Sidebar />
      <h2 className="page-title">Manage Orders</h2>
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Total</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>
                  {editOrderId === order.id ? (
                    <input name="name" value={formValues.name} onChange={handleChange} />
                  ) : order.name}
                </td>
                <td>
                  {editOrderId === order.id ? (
                    <input name="phone" value={formValues.phone} onChange={handleChange} />
                  ) : order.phone}
                </td>
                <td>
                  {editOrderId === order.id ? (
                    <input name="address" value={formValues.address} onChange={handleChange} />
                  ) : order.address}
                </td>
                <td>
                  {editOrderId === order.id ? (
                    <input name="payment_method" value={formValues.payment_method} onChange={handleChange} />
                  ) : order.payment_method}
                </td>
                <td>
                  {editOrderId === order.id ? (
                    <select name="order_status" value={formValues.order_status} onChange={handleChange}>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    order.order_status
                  )}
                </td>
                <td>
                  {editOrderId === order.id ? (
                    <input name="total_amount" value={formValues.total_amount} onChange={handleChange} />
                  ) : order.total_amount}
                </td>
                <td>
                  {editOrderId === order.id ? (
                    <button className="save-btn" onClick={() => handleUpdate(order.id)}>Save</button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEditClick(order)}>Edit</button>
                  )}
                </td>
                <td><button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;