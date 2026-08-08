import { motion } from "framer-motion";
import "./seedGrowthVideo.css";

export default function SeedGrowthVideo() {
  return (
    <section className="seed-video">
      <motion.div
        className="seed-video-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>🧅 Onion Crop Growth</h2>
        <p>
          See how Agrogandh onion seeds grow from early germination to
          healthy bulb formation under proper conditions.
        </p>

        <div className="video-wrapper">
          <video
            controls
            muted
            autoPlay
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1508747703725-719777637510"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-growing-onions-7929/1080p.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </section>
  );
}