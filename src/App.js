import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './Context/CartContext.jsx';
// import { LanguageProvider } from '../Translations/LanguageContext'; // Adjust the path as necessary
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import ContactUs from "./pages/Contactus.jsx";
import Products from './pages/Products';
import Register from './pages/Reg';
import Addproducts from './Admin/Addproducts.jsx';
import Listing from './pages/Listing/Listing.jsx';
import Dashborad from './Admin/Dashborad.jsx';
import AddCategories from './Admin/AddCategories.jsx';
import Login from './pages/Login/Login.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from "./pages/Checkout.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import AllCat from "./pages/Listing/AllCat.jsx";
import ProductList from './Admin/ProductList.jsx'
import Sliders from './Admin/Sliders.jsx';
import ManageOrders from './Admin/ManageOrders.jsx';
import ManageCategory from './Admin/ManageCategory.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Feedback from "./Admin/Feedback.jsx";
import UserDashboard from './pages/UserDashboard.jsx';
import ForgotPassword from './pages/Login/ForgotPassword.jsx';
import CategoryProductList from './pages/CategoryProductList.jsx'
import AdminLogin from './Admin/login/AdminLogin.jsx';
import Addnewadmin from './Admin/login/Createadmin';
import ProtectedRouteadmin from './Admin/Components/ProtectedRouteadmin.jsx'
import ManageUser from './Admin/ManageUser.jsx';
import Userinfo from './pages/Me.jsx';
import FooterNav from './components/FooterNav'
import ChangePasswordModal from './pages/model/ChangePasswordModal.jsx';
import EditProfileModal from './pages/model/EditProfileModal.jsx';
import Wishlist from './components/Wishlist.jsx'
import AddCoupncode from './Admin/CreateCoupon.jsx'
import BackToTopButton from "./components/BackToTopButton .jsx";
const App = () => {
  return (
    <>
      <CartProvider>
        <BackToTopButton />
        <Router>
          {/* <Navbar/> */}
          {/* <LanguageProvider> */}
          <Routes>

            {/* all user said routes */}
            <Route path="/" element={<><Navbar /><Home /><FooterNav /></>} />
            <Route path="/about" element={<><Navbar /><About /><FooterNav /></>} />
            <Route path="/contactus" element={<><Navbar /><ContactUs /><FooterNav /></>} />
            <Route path='/Listing/:id' element={<><Navbar /><Listing /><FooterNav /></>} />
            <Route path="/products" element={<><Navbar /><Products /><FooterNav /></>} />
            <Route path='/Register' element={<><Navbar /><Register /><FooterNav /></>} />
            <Route path='/Login' element={<><Navbar /><Login /><FooterNav /></>} />
            <Route path='/cart' element={<><Navbar /><Cart /><FooterNav /></>} />
            <Route path='/Checkout' element={<><Navbar /><ProtectedRoute><Checkout /> </ProtectedRoute><FooterNav /></>} />
            <Route path='/thankyou/:orderId' element={<><Navbar /><ThankYou /><FooterNav /></>} />
            {/* <Route path="/thankyou/:orderId" element={<ThankYou />} /> */}
            <Route path='/AllCat' element={<><Navbar /><AllCat /><FooterNav /></>} />
            <Route path="/MyOrders" element={<><Navbar /><MyOrders /><FooterNav /></>} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/ForgotPassword" element={<><Navbar /><ForgotPassword /><FooterNav /></>} />

            <Route path="/category/:id" element={<><Navbar /><CategoryProductList /></>} />
            <Route path='/account' element={<><Navbar /><Userinfo /><FooterNav /></>} />
            <Route path="/ChangePassword" element={<><Navbar /><ChangePasswordModal /><FooterNav /></>} />
            <Route path="/EditProfile" element={<><Navbar /><EditProfileModal /><FooterNav /></>} />
            <Route path='/Wishlist' element={<><Navbar /><Wishlist /><FooterNav /></>} />

            {/* all admin said routes */}
            <Route path='/admin' element={<ProtectedRouteadmin><Dashborad /></ProtectedRouteadmin>} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashborad />} />
            {/* <Route path='/admin/dashborad' element={<Dashborad />} /> */}
            <Route path='/admin/Addproduct' element={<><Addproducts /></>} />
            <Route path='/admin/ProductList' element={<ProductList />} />
            <Route path='/admin/AddCategories' element={<AddCategories />} />
            <Route path="/admin/Sliders" element={<Sliders />} />
            <Route path="/admin/ManageOrders" element={<ManageOrders />} />
            <Route path='/admin/ManageCategory' element={<ManageCategory />} />
            <Route path="/admin/addnewadmin" element={<Addnewadmin />} />
            <Route path='/admin/feedback' element={<Feedback />} />
            <Route path="/api/manageuser" element={<ManageUser />} />
            <Route path="/admin/createcoupn" element={<AddCoupncode/>}/>
          </Routes>
          {/* </LanguageProvider> */}
        </Router>
      </CartProvider>


    </>
  )
}

export default App