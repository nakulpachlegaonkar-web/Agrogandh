import "./companySections.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  easing,
  fadeLeft,
  fadeRight,
  fadeUp,
  viewportSettings,
} from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function VisionMissionSection() {
  const { content } = useSiteContent();
  const [activeSection, setActiveSection] = useState<"vision" | "mission" | null>(
    null,
  );

  const activeContent =
    activeSection === "vision"
      ? content.visionMission.vision
      : activeSection === "mission"
        ? content.visionMission.mission
        : null;

  const toggleSection = (section: "vision" | "mission") => {
    setActiveSection((currentSection) =>
      currentSection === section ? null : section,
    );
  };

  return (
    <section className="company-section vision-mission-section">
      <div className="vm-corner-accent" />
      <div className="vm-line vm-line-one" />
      <div className="vm-line vm-line-two" />

      <motion.div
        className="section-heading vm-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <span className="section-kicker">{content.visionMission.kicker}</span>
        <h2 className="section-title">{content.visionMission.title}</h2>
        <p className="section-description">{content.visionMission.description}</p>
      </motion.div>

      <div className="vm-stage">
        <motion.button
          type="button"
          className={`vm-shell vm-shell-left ${
            activeSection === "vision" ? "is-active" : ""
          }`}
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          whileHover={{ y: -10, rotate: -0.6 }}
          transition={{ duration: 0.45 }}
          onClick={() => toggleSection("vision")}
          aria-expanded={activeSection === "vision"}
          aria-controls="vision-mission-detail-panel"
          aria-label={content.visionMission.vision.label}
        >
          <div className="vm-arc vm-arc-coral" />
          <div className="vm-core vm-core-left">
            <span className="vm-icon">01</span>
            <h3>{content.visionMission.vision.label}</h3>
            <p>{content.visionMission.vision.short}</p>
          </div>
        </motion.button>

        <motion.button
          type="button"
          className={`vm-shell vm-shell-right ${
            activeSection === "mission" ? "is-active" : ""
          }`}
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          whileHover={{ y: -10, rotate: 0.6 }}
          transition={{ duration: 0.45 }}
          onClick={() => toggleSection("mission")}
          aria-expanded={activeSection === "mission"}
          aria-controls="vision-mission-detail-panel"
          aria-label={content.visionMission.mission.label}
        >
          <div className="vm-arc vm-arc-blue" />
          <div className="vm-core vm-core-right">
            <span className="vm-icon">02</span>
            <h3>{content.visionMission.mission.label}</h3>
            <p>{content.visionMission.mission.short}</p>
          </div>
        </motion.button>
      </div>

      <div className="vm-detail-panel-wrap">
        <AnimatePresence mode="wait" initial={false}>
          {activeContent ? (
            <motion.article
              key={activeSection}
              id="vision-mission-detail-panel"
              className={`vm-detail-panel vm-detail-panel-${activeSection}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.4, ease: easing }}
            >
              <span className="vm-detail-label">{activeContent.label}</span>
              <p>{activeContent.description}</p>
              <strong>{activeContent.statement}</strong>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
