const express = require('express');
const router = express.Router();
const db = require('../db'); // Your MySQL connection module

// Middleware to check if user is authenticated
const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

// Get all orders for logged-in user
router.get('/my-orders', requireLogin, (req, res) => {
  const userId = req.session.user.id;

  const orderQuery = `
    SELECT o.id AS order_id, o.created_at, o.total_amount, o.status,
           oi.pname, oi.quantity, oi.price, oi.variant_id,
           pv.quantity AS variant_quantity
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN product_variants pv ON oi.variant_id = pv.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(orderQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Error fetching orders' });
    }

    // Group items under their respective orders
    const groupedOrders = {};
    results.forEach(row => {
      if (!groupedOrders[row.order_id]) {
        groupedOrders[row.order_id] = {
          orderId: row.order_id,
          created_at: row.created_at,
          total_amount: row.total_amount,
          status: row.status,
          items: [],
        };
      }

      groupedOrders[row.order_id].items.push({
        pname: row.pname,
        quantity: row.quantity,
        price: row.price,
        variant_quantity: row.variant_quantity,
      });
    });

    const orders = Object.values(groupedOrders);
    res.json({ success: true, orders });
  });
});

module.exports = router;