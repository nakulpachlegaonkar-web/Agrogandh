import { useState } from "react";
import "./smartActions.css";

export default function SmartActions() {
  const [climate, setClimate] = useState("");
  const [result, setResult] = useState("");

  // Admin state
  const [ad, setAd] = useState("");
  const [platforms, setPlatforms] = useState({
    instagram: false,
    facebook: false,
    whatsapp: false,
  });
const [attachmentType, setAttachmentType] = useState("");
const [image, setImage] = useState<File | null>(null);
const [video, setVideo] = useState<File | null>(null);
const [file, setFile] = useState<File | null>(null);

  const suggestCrop = () => {
    if (climate === "dry") setResult("🌱 Recommended: Chia Seeds");
    else if (climate === "moderate") setResult("🧅 Recommended: Onion Seeds");
    else setResult("Please select climate");
  };

  const togglePlatform = (key: keyof typeof platforms) => {
    setPlatforms({ ...platforms, [key]: !platforms[key] });
  };

  return (
    <section className="smart-actions">
      {/* USER ACTIONS */}
      <div className="smart-grid">
        {/* AI Crop Suggestion */}
        <div className="card">
          <h3>🧠 AI Crop Suggestion</h3>

          <select onChange={(e) => setClimate(e.target.value)}>
            <option value="">Select Climate</option>
            <option value="dry">Dry</option>
            <option value="moderate">Moderate</option>
          </select>

          <button onClick={suggestCrop}>Suggest Crop</button>

          {result && <p className="result">{result}</p>}
        </div>

        {/* Dealer Enquiry */}
        <div className="card">
          <h3>🛒 Contact Dealer</h3>

          <input placeholder="Dealer Name" />
          <input placeholder="Mobile Number" />
          <input placeholder="Location" />

          <select>
            <option>Select Seed</option>
            <option>Chia Seeds</option>
            <option>Onion Seeds</option>
          </select>

          <button className="primary">Submit Enquiry</button>
        </div>
      </div>

{/* ADMIN SECTION */}
<div className="admin-section">
  <h3>🛠️ Admin – Publish Advertisement</h3>
  <p className="admin-note">Admin only section</p>

  {/* Ad text */}
  <textarea
    placeholder="Write your advertisement content..."
    value={ad}
    onChange={(e) => setAd(e.target.value)}
  />

  {/* Attachment type dropdown */}
  <select
    value={attachmentType}
    onChange={(e) => {
      setAttachmentType(e.target.value);
      setImage(null);
      setVideo(null);
      setFile(null);
    }}
  >
    <option value="">Select Attachment Type</option>
    <option value="image">📷 Image</option>
    <option value="video">🎥 Video</option>
    <option value="file">📎 File</option>
  </select>

  {/* Conditional upload input */}
  {attachmentType === "image" && (
    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setImage(e.target.files ? e.target.files[0] : null)
      }
    />
  )}

  {attachmentType === "video" && (
    <input
      type="file"
      accept="video/*"
      onChange={(e) =>
        setVideo(e.target.files ? e.target.files[0] : null)
      }
    />
  )}

  {attachmentType === "file" && (
    <input
      type="file"
      onChange={(e) =>
        setFile(e.target.files ? e.target.files[0] : null)
      }
    />
  )}

  {/* Platform selection */}
  <div className="platforms">
    <label><input type="checkbox" /> 📸 Instagram</label>
    <label><input type="checkbox" /> 📘 Facebook</label>
    <label><input type="checkbox" /> 💬 WhatsApp</label>
  </div>

  <button className="publish">Publish Ad</button>

  {/* Preview */}
  {(ad || image || video || file) && (
    <div className="preview">
      <strong>Live Preview</strong>

      {ad && <p>{ad}</p>}

      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="preview-image"
        />
      )}

      {video && (
        <video
          src={URL.createObjectURL(video)}
          controls
          className="preview-video"
        />
      )}

      {file && <p>📎 {file.name}</p>}
    </div>
  )}
</div>
    </section>
  );
}