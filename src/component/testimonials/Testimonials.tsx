import { motion } from "framer-motion";
import "./testimonials.css"

const testimonials = [
  {
    name: "Ramesh, Maharashtra",
    text: "Yield increased by 30% using Agrogandh seeds."
  },
  {
    name: "Suresh, Karnataka",
    text: "Strong germination and healthy crops."
  },
  {
    name: "Mahesh, MP",
    text: "Best quality onion seeds in the market."
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2 className="testimonials-title">👨‍🌾 Farmer Stories</h2>

      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="testimonial-text">“{t.text}”</p>
            <span className="testimonial-name">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}