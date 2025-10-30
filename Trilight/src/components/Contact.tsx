export const Contact = () => (
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <span class="section-tag">GET IN TOUCH</span>
          <h2 class="section-title">Let's Build Your Dream Home</h2>
          <p class="contact-desc">
            Our team is here to help you find the perfect home. Reach out today and let's start your journey to luxury living.
          </p>
          
          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="info-text">
                <h4>Call Us</h4>
                <p>+91 40 1234 5678</p>
                <p>Mon - Sat: 9 AM - 7 PM</p>
              </div>
            </div>
            
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="info-text">
                <h4>Email Us</h4>
                <p>sales@trilightgroup.com</p>
                <p>info@trilightgroup.com</p>
              </div>
            </div>
            
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="info-text">
                <h4>Visit Us</h4>
                <p>Financial District</p>
                <p>Hyderabad, Telangana</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form-wrapper">
          <form class="contact-form" id="contactForm">
            <div class="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div class="form-group">
              <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <div class="form-group">
              <input type="tel" name="phone" placeholder="Phone Number" required />
            </div>
            <div class="form-group">
              <select name="project" required>
                <option value="">Select Project</option>
                <option value="rise">Rise - Neopolis, Kokapet</option>
                <option value="trisire">Trisire - Luxury Villas</option>
                <option value="kompally">Kompally - Coming Soon</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
            <div class="form-group full">
              <textarea name="message" rows={4} placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="btn-primary full">
              <span>Send Message</span>
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
)