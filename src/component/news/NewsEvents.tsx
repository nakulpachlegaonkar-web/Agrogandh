import "./newsEvents.css";
import { mediaInsights } from "../../data/companyData";

export default function NewsEvents() {
  return (
    <section id="media" className="news">
      <div className="news-heading">
        <span className="section-kicker">Media &amp; Insights</span>
        <h2 className="news-title">Updates that support better farming decisions</h2>
        <p className="news-description">
          We share product highlights, practical seed guidance, and company
          insights that reflect our focus on quality and farmer success.
        </p>
      </div>

      <div className="news-grid">
        {mediaInsights.map((item) => (
          <article key={item.title} className="news-card">
            <span className="news-date">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
