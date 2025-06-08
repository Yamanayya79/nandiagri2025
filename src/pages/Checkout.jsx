import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Checkout.css';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = item.selectedVariant?.price || 0;
      total += price * (item.quantity || 1);
    });
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || '',
        phone: user.mnumber || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ')[1] || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = async () => {
    if (couponApplied) {
      toast.info("Coupon already applied.");
      return;
    }

    if (!couponCode) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const res = await axios.post("https://agriapi2025.onrender.com//api/validate-coupon", {
        code: couponCode,
        totalAmount, // Send the total amount for validation
      });

      if (res.data.success) {
        const discountAmount = res.data.discount || 0; // Adjust based on your backend response

        setDiscount(discountAmount);
        setCouponApplied(true); // Prevent future applications
        // Keeping couponCode input showing the applied code
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid or expired coupon.");
      }
    } catch (error) {
      toast.error("Error validating coupon");
      console.error("Coupon error:", error);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponApplied(false);
    setCouponCode('');
    toast.info("Coupon removed.");
  };

  const placeOrder = async () => {
    const {
      email, phone, firstName, lastName, address, city, state, pincode, paymentMethod,
    } = formData;

    if (!email || !phone || !firstName || !address || !city || !state || !pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    const formattedItems = cartItems.map(item => ({
      product_id: item.id,
      pname: item.pname,
      variant_id: item.selectedVariant?.id || null,
      quantity: item.quantity || 1,
      price: item.selectedVariant?.price || 0,
    }));

    try {
      const response = await fetch('https://agriapi2025.onrender.com//api/place-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: {
            name: `${firstName} ${lastName}`,
            phone,
            address,
            city,
            state,
            pin: pincode
          },
          items: formattedItems,
          totalAmount: totalAmount - discount, // Send discounted total
          coupon: couponCode || null, // Send coupon code if applied
          
          discount: discount || 0, // Send discount amount
          paymentMethod,

        })
      });
      console.log("coupon applied =>", couponCode?.code)
      console.log("coupon =>", couponCode)

      const data = await response.json();
      if (response.ok) {
        toast.success('Order placed successfully!');
        alert(`Order placed successfully! Order Id Is ${data.orderId}`)
        clearCart();
        // navigate('/thankyou');
        navigate(`/thankyou/${data.orderId}`);
        // /thankyou/:orderId
        // navigate('/thankyou', { state: { orderId: data.orderId } });
      } else {
        toast.error('Failed to place order: ' + data.message);
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Something went wrong while placing the order.');
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Contact</h2>
        <input type="emaizl" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

        <h2>Delivery</h2>
        <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" value={formData.apartment} onChange={handleChange} />
        <div className="row">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <input type="text" name="pincode" placeholder="PIN code" value={formData.pincode} onChange={handleChange} />
        </div>
        <input type="text" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />

        <h2>Payment</h2>
        <label>
          <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="manual" checked={formData.paymentMethod === 'manual'} onChange={handleChange} />
          Manual UPI Transfer
        </label>

        <button onClick={placeOrder} className="pay-btn">Pay Now</button>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>
        {cartItems.map((item, index) => {
          const variant = item.selectedVariant;
          return (
            <div key={index} className="order-item">
              <img src={`https://agriapi2025.onrender.com//uploads/${item.images[0]?.image_name}`} alt={item.pname} />
              <div>
                <p>{item.pname} ({variant?.quantity})</p>
                <p>₹{variant?.price}</p>
              </div>
            </div>
          );
        })}

        <div className="summary">
          {!couponApplied ? (
            <>
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
              />
              <button onClick={applyCoupon}>Apply Coupon</button>
            </>
          ) : (
            <div style={{ marginBottom: '1rem' }}>
              <p>
                Coupon <strong>{couponCode}</strong> applied.{' '}
                <button
                  type="button"
                  onClick={removeCoupon}
                  style={{
                    marginLeft: 8,
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    lineHeight: 1,
                  }}
                  aria-label="Remove applied coupon"
                  title="Remove coupon"
                >
                  &times;
                </button>
              </p>
              <p style={{ color: 'green' }}>Discount: -₹{Number(discount).toFixed(2)}</p>
            </div>
          )}

          <p>Subtotal: ₹{totalAmount.toFixed(2)}</p>
          <p>Shipping: To be calculated</p>
          <h4>Total: ₹{(totalAmount - discount).toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

