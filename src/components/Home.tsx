import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>የፌዴራል የመንግስት ሠራተኞን</h2>
            <p>Federal Government Employees</p>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>Admin Login</Link>
          </div>
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">የሕይወት ታሪክ ቅጽ</span>
            </h1>
            <h2 className="hero-subtitle">Life History Form</h2>
            <p className="hero-description">
              Complete your employee life history form with ease. A comprehensive digital solution 
              for federal government employees to manage their personal and professional information.
            </p>
            <div className="hero-buttons">
              <Link to="/form" className="btn btn-primary">
                Life History Form
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/social-security" className="btn btn-primary">
                Social Security Form
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a href="#about" className="btn btn-secondary">
                Learn More
              </a>
              <Link to="/admin/login" className="btn btn-secondary">
                Admin Login
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">📋</div>
              <p>Personal Info</p>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">👨‍👩‍👧‍👦</div>
              <p>Family Details</p>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🎓</div>
              <p>Education</p>
            </div>
            <div className="floating-card card-4">
              <div className="card-icon">💼</div>
              <p>Work Experience</p>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll Down</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Form?</h2>
            <p className="section-subtitle">A comprehensive solution for employee documentation</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Easy to Use</h3>
              <p>Intuitive interface designed for simplicity and efficiency. Complete your form in minutes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your information is protected with industry-standard security measures.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Access and complete your form from any device - desktop, tablet, or mobile.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Processing</h3>
              <p>Submit your form instantly and receive confirmation immediately.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h3>Auto-Save</h3>
              <p>Your progress is automatically saved, so you never lose your work.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Validation</h3>
              <p>Real-time validation ensures all required fields are completed correctly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Form Sections</h2>
            <p className="section-subtitle">Comprehensive information collection</p>
          </div>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-number">01</div>
              <h3>Personal Information</h3>
              <p>Complete personal details including name, birth information, and contact details.</p>
            </div>
            <div className="service-item">
              <div className="service-number">02</div>
              <h3>Family Information</h3>
              <p>Document your family structure, marital status, and children's information.</p>
            </div>
            <div className="service-item">
              <div className="service-number">03</div>
              <h3>Emergency Contacts</h3>
              <p>Provide emergency contact information for quick access when needed.</p>
            </div>
            <div className="service-item">
              <div className="service-number">04</div>
              <h3>Education History</h3>
              <p>Record your complete educational background and qualifications.</p>
            </div>
            <div className="service-item">
              <div className="service-number">05</div>
              <h3>Work Experience</h3>
              <p>Document your professional work history and career progression.</p>
            </div>
            <div className="service-item">
              <div className="service-number">06</div>
              <h3>Skills & Languages</h3>
              <p>Showcase your special skills and language proficiencies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number" data-target="10000">0</div>
              <div className="stat-label">Forms Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="5000">0</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="99">0</div>
              <div className="stat-label">% Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="24">0</div>
              <div className="stat-label">Support Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">We're here to help you with any questions</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>ወሊሶ ቢዝነስና ኢኮኖሚክስ ካምፓስ<br />Woliso Business and Economics Campus</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@government.gov.et</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+251 11 123 4567</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                </div>
                <input type="text" placeholder="Subject" required />
                <textarea placeholder="Your Message" rows={5} required></textarea>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>የፌዴራል የመንግስት ሠራተኞን</h3>
              <p>Federal Government Employees Portal</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/form">Life History Form</Link></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook" title="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22.675 0H1.325A1.325 1.325 0 0 0 0 1.325v21.351C0 23.405.595 24 1.325 24h11.494v-9.294H9.69V11.29h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.765v2.314h3.59l-.467 3.416h-3.123V24h6.116A1.325 1.325 0 0 0 24 22.676V1.325A1.325 1.325 0 0 0 22.675 0z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" title="Twitter">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.955-2.178-1.55-3.594-1.55-2.723 0-4.932 2.208-4.932 4.93 0 .386.045.762.127 1.124-4.094-.205-7.725-2.166-10.158-5.144-.424.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.318-3.809 2.105-6.115 2.105-.398 0-.79-.023-1.17-.067 2.189 1.402 4.768 2.22 7.557 2.22 9.054 0 14.001-7.496 14.001-13.986 0-.21 0-.423-.016-.635.961-.695 1.8-1.562 2.46-2.549z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" title="LinkedIn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.135 1.447-2.135 2.943v5.663H9.001V9h3.112v1.561h.043c.434-.823 1.494-1.692 3.074-1.692 3.29 0 3.899 2.164 3.899 4.979v6.604zM5.337 7.433a1.808 1.808 0 1 1 0-3.616 1.808 1.808 0 0 1 0 3.616zM6.782 20.452H3.893V9h2.889v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" title="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.262 2.242 1.324 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.324 3.608-.975.975-2.242 1.262-3.608 1.324-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.324-.975-.975-1.262-2.242-1.324-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.324-3.608.975-.975 2.242-1.262 3.608-1.324C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.16 0-3.532.012-4.777.069-1.048.048-1.616.224-1.992.372-.5.194-.858.427-1.235.804-.377.377-.61.735-.804 1.235-.148.376-.324.944-.372 1.992-.057 1.245-.069 1.617-.069 4.777s.012 3.532.069 4.777c.048 1.048.224 1.616.372 1.992.194.5.427.858.804 1.235.377.377.735.61 1.235.804.376.148.944.324 1.992.372 1.245.057 1.617.069 4.777.069s3.532-.012 4.777-.069c1.048-.048 1.616-.224 1.992-.372.5-.194.858-.427 1.235-.804.377-.377.61-.735.804-1.235.148-.376.324-.944.372-1.992.057-1.245.069-1.617.069-4.777s-.012-3.532-.069-4.777c-.048-1.048-.224-1.616-.372-1.992a3.37 3.37 0 0 0-.804-1.235 3.37 3.37 0 0 0-1.235-.804c-.376-.148-.944-.324-1.992-.372-1.245-.057-1.617-.069-4.777-.069zm0 3.892a4.106 4.106 0 1 1 0 8.212 4.106 4.106 0 0 1 0-8.212zm0 1.838a2.268 2.268 0 1 0 0 4.536 2.268 2.268 0 0 0 0-4.536zm5.23-3.02a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Federal Government Employees Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

