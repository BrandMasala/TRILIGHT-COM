export const NavBar = () => (
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <div class="logo-mark">
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
        </div>
        <span class="logo-text">TRILIGHT GROUP</span>
      </div>

      <div class="nav-links" id="navLinks">
        <a href="#home" class="nav-link active">Home</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>

      <div class="nav-actions">
        <button class="btn-enquire">Enquire Now</button>
        <button class="menu-toggle" id="menuToggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
)