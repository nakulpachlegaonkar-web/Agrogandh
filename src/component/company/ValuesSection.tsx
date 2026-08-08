import "./companySections.css";
import { values } from "../../data/companyData";

export default function ValuesSection() {
  return (
    <section className="company-section values-section">
      <div className="section-heading">
        <span className="section-kicker">Values</span>
        <h2 className="section-title">What guides our work</h2>
        <p className="section-description">
          Every seed, relationship, and decision is shaped by principles that
          keep farmers at the center of our work.
        </p>
      </div>

      <div className="values-grid">
        {values.map((value) => (
          <article key={value.title} className="value-card">
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
