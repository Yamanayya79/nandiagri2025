// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     const existing = cartItems.find(item => item.id === product.id);
    
//     alert('Product added to cart:', product);

//     if (existing) {
//       setCartItems(cartItems.map(item =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };
  
//   const clearCart=()=>{
//     alert('Cart cleared');
//     setCartItems([])
//   }

//   // const removeFromCart = (id) => {
//   //   setCartItems(cartItems.filter(item => item.id !== id));
//   // };
//   const removeFromCart = (id, variantId) => {
//   setCartItems(cartItems.filter(item => !(item.id === id && item.variants[0]?.id === variantId)));
// };

//  const updateQuantity = (id, delta) => {
//   setCartItems(prev =>
//     prev.map(item =>
//       item.id === id
//         ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
//         : item
//     )
//   );
// };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
// import { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     setCartItems(prev => [...prev, item]);
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // const addToCart = (product) => {
  //   setCartItems((prevItems) => {
  //     const existing = prevItems.find(
  //       (item) =>
  //         item.id === product.id &&
  //         item.selectedVariant?.quantity === product.selectedVariant?.quantity
  //     );

  //     if (existing) {
  //       return prevItems.map((item) =>
  //         item.id === product.id &&
  //         item.selectedVariant?.quantity === product.selectedVariant?.quantity
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       return [...prevItems, { ...product, quantity: 1 }];
  //     }
  //   });
  // };
const addToCart = (item) => {
  setCartItems((prevItems) => {
    const existingItemIndex = prevItems.findIndex(
      (i) => i.id === item.id && i.selectedVariant?.id === item.selectedVariant?.id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if already in cart with same variant
      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex].quantity += item.quantity || 1;
      return updatedItems;
    }

    // Add new item
    return [...prevItems, { ...item, quantity: item.quantity || 1 }];
  });
};
  const clearCart = () => {
    setCartItems([]);
  };
const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      const price =
        item.selectedVariant?.price ||
        item.variants?.[0]?.price ||
        0;
      return acc + price * quantity;
    }, 0);

    setTotalAmount(total);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, totalAmount, addToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};