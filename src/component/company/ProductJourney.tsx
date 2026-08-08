import "./companySections.css";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportSettings } from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function ProductJourney() {
  const { content } = useSiteContent();

  return (
    <section id="journey" className="company-section journey-section">
      <motion.div
        className="section-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <span className="section-kicker">{content.journey.kicker}</span>
        <h2 className="section-title">{content.journey.title}</h2>
        <p className="section-description">{content.journey.description}</p>
      </motion.div>

      <motion.div
        className="journey-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        {content.journey.steps.map((step, index) => (
          <motion.article
            key={step.title}
            className="journey-step"
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <span className="journey-step-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
