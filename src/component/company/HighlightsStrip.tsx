import "./companySections.css";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportSettings } from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function HighlightsStrip() {
  const { content } = useSiteContent();

  return (
    <section className="highlights-strip">
      <div className="highlights-inner">
        <div className="highlights-glow highlights-glow-one" />
        <div className="highlights-glow highlights-glow-two" />

        <motion.div
          className="highlights-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <span className="section-kicker">{content.highlights.kicker}</span>
          <h2>{content.highlights.title}</h2>
        </motion.div>

        <motion.div
          className="highlights-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          {content.highlights.items.map((item) => (
            <motion.article
              key={item.value}
              className="highlight-stat-card"
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
