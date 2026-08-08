import { requestApi } from "./api";

type EnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
  language: "en" | "mr";
  sourcePage: "home" | "products";
};

export async function saveEnquiry(payload: EnquiryPayload) {
  await requestApi("/api/enquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
