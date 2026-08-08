import "./companySections.css";
import { motion } from "framer-motion";
import { fadeLeft, fadeUp, viewportSettings } from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function CompanyOverview() {
  const { content } = useSiteContent();

  return (
    <section id="about" className="company-section overview-section">
      <motion.div
        className="section-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <span className="section-kicker">{content.about.kicker}</span>
        <h2 className="section-title">{content.about.title}</h2>
        <p className="section-description">{content.about.description}</p>
      </motion.div>

      <div className="overview-grid overview-grid-single">
        <motion.article
          className="story-card story-card-full"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.article>
      </div>
    </section>
  );
}
