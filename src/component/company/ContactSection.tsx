import "./companySections.css";
import { motion } from "framer-motion";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  viewportSettings,
} from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function ContactSection() {
  const { content } = useSiteContent();

  return (
    <section id="contact" className="company-section contact-section">
      <motion.div
        className="section-heading contact-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <span className="section-kicker">{content.contact.kicker}</span>
        <h2 className="section-title">{content.contact.title}</h2>
        <p className="section-description">{content.contact.description}</p>
      </motion.div>

      <div className="contact-layout">
        <motion.div
          className="contact-copy"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <motion.div className="contact-card-list" variants={fadeLeft}>
            <article className="contact-card">
              <span>{content.contact.emailLabel}</span>
              <a href={`mailto:${content.contactInfo.email}`}>{content.contactInfo.email}</a>
            </article>

            <article className="contact-card">
              <span>{content.contact.phoneLabel}</span>
              <a href={`tel:${content.contactInfo.phones[0]}`}>{content.contactInfo.phones[0]}</a>
              <a href={`tel:${content.contactInfo.phones[1]}`}>{content.contactInfo.phones[1]}</a>
            </article>

            <article className="contact-card">
              <span>{content.contact.officeLabel}</span>
              <p>{content.contactInfo.office}</p>
            </article>
          </motion.div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={(event) => event.preventDefault()}
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
        >
          <h3>{content.contact.formTitle}</h3>

          <label>
            {content.contact.fields.name}
            <input
              type="text"
              name="name"
              placeholder={content.contact.fields.placeholders.name}
            />
          </label>

          <label>
            {content.contact.fields.phone}
            <input
              type="tel"
              name="phone"
              placeholder={content.contact.fields.placeholders.phone}
            />
          </label>

          <label>
            {content.contact.fields.email}
            <input
              type="email"
              name="email"
              placeholder={content.contact.fields.placeholders.email}
            />
          </label>

          <label>
            {content.contact.fields.message}
            <textarea
              name="message"
              rows={5}
              placeholder={content.contact.fields.placeholders.message}
            />
          </label>

          <button type="submit">{content.contact.fields.submit}</button>
        </motion.form>
      </div>
    </section>
  );
}
