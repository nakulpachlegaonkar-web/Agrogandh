import { useState } from "react";

export default function CropSuggestion() {
  const [climate, setClimate] = useState("");
  const [result, setResult] = useState("");

  const suggest = () => {
    if (climate === "dry") setResult("Chia Seeds Recommended 🌱");
    else if (climate === "moderate") setResult("Pink Onion Seeds Recommended 🧅");
    else setResult("Please select climate");
  };

  return (
    <section className="ai">
      <h2>🧠 AI Crop Suggestion</h2>
      <select onChange={(e) => setClimate(e.target.value)}>
        <option value="">Select Climate</option>
        <option value="dry">Dry</option>
        <option value="moderate">Moderate</option>
      </select>
      <button onClick={suggest}>Suggest Crop</button>
      {result && <p>{result}</p>}
    </section>
  );
}