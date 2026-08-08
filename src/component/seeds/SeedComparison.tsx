import "./seedComparison.css";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportSettings } from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function SeedComparison() {
  const { content } = useSiteContent();

  return (
    <section id="products" className="comparison">
      <motion.div
        className="comparison-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <span className="section-kicker">{content.products.kicker}</span>
        <h2 className="comparison-title">{content.products.title}</h2>
        <p className="comparison-description">{content.products.description}</p>
      </motion.div>

      <motion.div
        className="comparison-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        {content.products.items.map((product) => (
          <motion.article
            key={product.name}
            className="comparison-card"
            variants={fadeUp}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <img src={product.image} alt={product.name} className="comparison-image" />

            <div className="comparison-copy">
              <span className="product-badge">{product.variant}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <ul>
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
