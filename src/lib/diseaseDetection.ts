import { requestApi } from "./api";

export type DiseaseAnalysisResult = {
  disease: string;
  confidence: string;
  severity: string;
  summary: string;
  visibleSymptoms: string[];
  likelyCauses: string[];
  immediateActions: string[];
  prevention: string[];
  disclaimer: string;
  needsExpertReview: boolean;
};

type AnalyzeDiseasePayload = {
  cropType: "onion" | "chia";
  file: File;
  language: "en" | "mr";
};

type DiseaseApiResponse = {
  success: true;
  model: string;
  result: DiseaseAnalysisResult;
};

export async function analyzeDisease({
  cropType,
  file,
  language,
}: AnalyzeDiseasePayload) {
  const imageBase64 = await fileToBase64(file);
  const payload = await requestApi<DiseaseApiResponse>("/api/disease-detection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cropType,
      language,
      fileName: file.name,
      mimeType: file.type || "image/jpeg",
      imageBase64,
    }),
  });

  return payload.result;
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const base64 = result.split(",").at(-1) || "";

      if (!base64) {
        reject(new Error("Unable to read the selected image."));
        return;
      }

      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Unable to read the selected image."));
    };

    reader.readAsDataURL(file);
  });
}
