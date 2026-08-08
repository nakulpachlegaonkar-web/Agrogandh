import "./companySections.css";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportSettings } from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function WhyChooseSection() {
  const { content } = useSiteContent();

  return (
    <section className="company-section reasons-section">
      <motion.div
        className="section-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <span className="section-kicker">{content.reasons.kicker}</span>
        <h2 className="section-title">{content.reasons.title}</h2>
      </motion.div>

      <motion.div
        className="reasons-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        {content.reasons.items.map((item) => (
          <motion.article
            key={item.title}
            className="reason-card"
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
