import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/ThankYou.css';
import { toast } from 'react-toastify';

const ThankYou = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (orderId) {
      axios.get(`https://agriapi2025.onrender.com//api/order/${orderId}`)
        .then((res) => {
          setOrder(res.data.order);
          setItems(res.data.items);
        })
        .catch((err) => {
          console.error("Failed to fetch order:", err);
          toast.error("Failed to load order details.");
        });
    }
  }, [orderId]);

const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Order Invoice - #${orderId}`, 20, 20);
    doc.text(`Name: ${order?.name}`, 20, 30);
    doc.text(`Phone: ${order?.phone}`, 20, 40);
    doc.text(`Address: ${order?.address}, ${order?.city}, ${order?.state} - ${order?.pin}`, 20, 50);
    doc.text(`Payment Method: ${order?.payment_method}`, 20, 60);
    doc.text(`Total Amount: ₹${order?.total_amount}`, 20, 70);

    const tableData = items.map(item => [
      item.pname,
      item.quantity,
      `₹${item.price}`,
      `₹${item.price * item.quantity}`
    ]);

    doc.autotable({
      head: [['Product', 'Qty', 'Price', 'Total']],
      body: tableData,
      startY: 80
    });

    doc.save(`Order_${orderId}.pdf`);
};




  return (
    <div className="thankyou-container">
      <h1>🎉 Thank You for Your Order!</h1>
      {order ? (
        <div className="order-details">
          <div className="order-info">
            <p><strong>Order ID:</strong> #{orderId}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.pin}</p>
            <p><strong>Payment Method:</strong> {order.payment_method}</p>
            <p><strong>Total:</strong> ₹{order.total_amount}</p>
            {order.discount_amount > 0 && (
              <p><strong>Discount:</strong> ₹{order.discount_amount} (Code: {order.coupon_code})</p>
            )}
          </div>

          <h2>🛍 Ordered Items</h2>
          <div className="order-items">
            {items.map((item, idx) => (
              <div className="item-card" key={idx}>
                <img src={`https://agriapi2025.onrender.com//uploads/${item.image}`} alt={item.pname} />
                <div>
                  <p><strong>{item.pname}</strong></p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price} each</p>
                </div>
              </div>
            ))}
            
          </div>

          <button onClick={downloadPDF} className="pdf-button">📄 Download Invoice</button>
         <Link to='/'  ><button  className="ctn-shopbutton">📄 Continue Shoping..</button></Link>
          
        </div>
        
      ) : (
        <p>Loading order details...</p>
      )}
      
    </div>
  );
};

export default ThankYou;