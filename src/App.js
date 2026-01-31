import React, { useState } from 'react';
import './styles.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Classic Linen Shirt",
      price: "$89",
      category: "Tops",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop"
    },
    {
      id: 2,
      name: "Premium Denim Jacket",
      price: "$159",
      category: "Outerwear",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Tailored Trousers",
      price: "$129",
      category: "Bottoms",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=600&fit=crop"
    },
    {
      id: 4,
      name: "Cashmere Sweater",
      price: "$189",
      category: "Knitwear",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop"
    },
    {
      id: 5,
      name: "Silk Dress",
      price: "$249",
      category: "Dresses",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"
    },
    {
      id: 6,
      name: "Wool Coat",
      price: "$329",
      category: "Outerwear",
      image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=600&fit=crop"
    }
  ];

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">LUXE</div>
          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#shop" className="nav-link">Shop</a>
            <a href="#collections" className="nav-link">Collections</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-icons">
            <button className="icon-btn">Search</button>
            <button className="icon-btn">Cart (0)</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-title">Timeless Elegance</h1>
          <p className="hero-subtitle">Discover our new collection of premium clothing</p>
          <button className="hero-btn">Shop Now</button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-container">
          <div className="feature">
            <div className="feature-icon">✓</div>
            <h3>Premium Quality</h3>
            <p>Hand-selected materials for lasting comfort</p>
          </div>
          <div className="feature">
            <div className="feature-icon">♻</div>
            <h3>Sustainable</h3>
            <p>Eco-friendly production and ethical sourcing</p>
          </div>
          <div className="feature">
            <div className="feature-icon">✈</div>
            <h3>Free Shipping</h3>
            <p>On orders over $150 worldwide</p>
          </div>
          <div className="feature">
            <div className="feature-icon">↺</div>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free return policy</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="shop">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Explore our latest collection</p>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collection Banner */}
      <section className="collection-banner" id="collections">
        <div className="banner-content">
          <h2 className="banner-title">Spring/Summer 2026</h2>
          <p className="banner-text">Embrace the season with our curated collection</p>
          <button className="banner-btn">Explore Collection</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">Our Story</h2>
            <p className="about-text">
              Founded in 2020, LUXE is committed to creating timeless pieces that blend 
              sophistication with sustainability. We believe in quality over quantity, 
              crafting garments that will remain in your wardrobe for years to come.
            </p>
            <p className="about-text">
              Every piece is carefully designed and ethically produced, ensuring both 
              style and conscience go hand in hand.
            </p>
            <button className="about-btn">Learn More</button>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop" alt="Fashion" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-container">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-text">Subscribe to receive exclusive offers and updates</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">LUXE</h3>
            <p className="footer-text">Premium clothing for the modern lifestyle</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><a href="#new">New Arrivals</a></li>
              <li><a href="#women">Women</a></li>
              <li><a href="#men">Men</a></li>
              <li><a href="#sale">Sale</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#stores">Stores</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact</a></li>
              <li><a href="#shipping">Shipping</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 LUXE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
