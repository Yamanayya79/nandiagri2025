import React from 'react';
import '../styles/Home.css';
import Catgery from '../components/Catgery';
import Slider from '../components/Slider';
import Products from '../pages/Products';
import CategoryWiseProducts from '../pages/CategoryWiseProducts'
import Footer from '../components/Footer';
import FooterNav from '../components/FooterNav';

const Home = () => {
  return (
    <div className="home-container">
      <div className="section">
        <Catgery />
      </div>
      <div className="section">
        <Slider />
      </div>
      <div className="products-section">
        {/* <Products /> */}
        <CategoryWiseProducts/>
      </div>
      <Footer />
      <FooterNav />
    </div>
  );
};

export default Home;