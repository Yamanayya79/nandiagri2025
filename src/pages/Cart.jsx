import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        navigate('/checkout');
    };

    const handleBuyNow = (item) => {
        clearCart();
        const productWithQty = { ...item, quantity: 1 };
        // You should re-add this single item to cart, or pass it via state
        navigate('/checkout', { state: { buyNowItem: productWithQty } });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.selectedVariant.price * item.quantity;
        }, 0);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-card">
                                <img
                                    src={`https://agriapi2025.onrender.com/uploads/${item.images[0]?.image_name}`}
                                    alt={item.pname}
                                />
                                <div className="cart-info">
                                    <h3>{item.pname}</h3>
                                    <p><strong>Variant:</strong> {item.selectedVariant?.quantity}</p>
                                    <p><strong>Price:</strong> ₹{item.selectedVariant?.price}</p>
                                    <p><strong>Qty:</strong> {item.quantity}</p>
                                    <p><strong>Total:</strong> ₹{item.selectedVariant?.price * item.quantity}</p>
                                    <div className="cart-actions">
                                        <button onClick={() => removeFromCart(item.id, item.selectedVariant?.id)}>Remove</button>
                                        <button onClick={() => handleBuyNow(item)}>Buy This</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Subtotal: ₹{calculateTotal()}</h3>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                        <button className="clear-btn" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;