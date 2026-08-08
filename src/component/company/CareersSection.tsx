import "./companySections.css";

export default function CareersSection() {
  return (
    <section id="careers" className="company-section careers-section">
      <div className="careers-card">
        <span className="section-kicker">Careers With Us</span>
        <h2 className="section-title">Work with us</h2>
        <p className="section-description">
          We welcome people who care about quality, innovation, reliability,
          and farmer success. Visit our LinkedIn page for future opportunities
          and company updates.
        </p>

        <div className="careers-tags">
          <span>Quality Driven</span>
          <span>Innovation Focused</span>
          <span>Farmer Centric</span>
        </div>

        <p className="careers-note">LinkedIn page link can be added here when available.</p>
      </div>
    </section>
  );
}
