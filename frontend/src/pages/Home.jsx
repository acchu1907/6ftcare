import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
        <section className="hero-card">
  <div className="hero-content">
    <h1 className="hero-title">6ftCare</h1>
    <p className="hero-text">
      6FeetCare offers seamless healthcare with expert services in women’s
      health, men’s health, addiction prevention, and wellness — supporting
      you at every step.
    </p>
  </div>

  <div className="hero-image">
    <img src="/image7.png" alt="Doctor Illustration" />

  </div>
</section>

<section className="categories">
  <div className="category-card children">
    <h3>Children</h3>
    <p>Caring for little ones, nurturing bright futures.</p>
    <img src="/image1.png" alt="Children Care" />
  </div>

  <div className="category-card women">
    <h3>Women</h3>
    <p>Empowering women with care, confidence, and wellness.</p>
    <img src="/image2.png" alt="Women Care" />
  </div>

  <div className="category-card men">
    <h3>Men</h3>
    <p>Strong health for a stronger you.</p>
    <img src="/image3.png" alt="Men Care" />
  </div>

  <div className="category-card general">
    <h3>General</h3>
    <p><u>Live happy, live together.</u></p>
    <img src="/image4.png" alt="General Wellness" />
  </div>
</section>

<section className="about-section">
  <div className="about-content">
    <h2>About Us</h2>
    <p>
      At 6FeetCare, we are dedicated to providing accessible, reliable, and
      patient-centered healthcare for everyone. Our mini hospital platform
      offers a seamless appointment booking system and specialized services,
      including women's health, men's health, children's care, addiction
      prevention, and general wellness.
    </p>
    <p>
      We believe that quality healthcare should be convenient and
      comprehensive, ensuring you get the best treatment whenever needed.
    </p>
  </div>

  <div className="about-image">
    <img src="/image8.png" alt="About 6ftCare" />
  </div>
</section>


    </div>
  );
}

export default Home;
