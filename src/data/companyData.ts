import { chiaSeedImage, onionSeedImage } from "../assets";

export const companyInfo = {
  name: "Agrogandh Seeds Pvt. Ltd.",
  email: "agrogandhseedspvtltd@gmail.com",
  phones: ["9657182416", "9579795769"],
  whatsappPhone: "919657182416",
  registeredOffice:
    "Near Z.P. Ground, Bus Stand Road, Chikhali - 443201, Dist. Buldhana, Maharashtra",
  contactDescription:
    "At Agrogandh Seeds Pvt. Ltd., we believe in quality, trust, and farmer support. For any product or service inquiries, please get in touch with our team.",
  shortVision:
    "To become a trusted leader in delivering high-quality seeds for sustainable farming.",
  shortMission:
    "To deliver high-quality seeds that ensure better crop performance and farmer success.",
  vision:
    "Our vision is to deliver innovative, high-quality seeds that help farmers grow stronger crops and achieve better yields. We strive to combine advanced seed genetics with reliability, ensuring farmers have the foundation for sustainable and successful agriculture.",
  visionStatement:
    "To be a trusted leader in the seed industry by delivering innovative, high-quality seeds that empower farmers and drive sustainable agricultural growth.",
  mission:
    "Our mission is to provide high-quality, reliable seeds that help farmers achieve stronger crops and higher yields. We focus on innovation, strict quality standards, and advanced seed development. Through dependable seed solutions, we aim to support farmers and promote sustainable agricultural growth.",
  missionStatement:
    "To develop and provide superior seed varieties through continuous research, strict quality standards, and farmer-centric solutions that enhance crop productivity and farm success.",
  about: [
    "Agrogandh Seeds Pvt. Ltd. is committed to delivering high-quality onion seeds that help farmers achieve better productivity and reliable crop performance. Our journey began with a clear vision to provide dependable seed solutions that support modern and sustainable farming practices.",
    "With a strong focus on quality, careful seed selection, and continuous improvement, we work to develop onion seeds that perform well across diverse farming conditions. We believe that the right seed is the foundation of a successful harvest.",
    "At Agrogandh Seeds Pvt. Ltd., our goal is to build long-term trust with farmers by offering seeds that combine consistency, quality, and performance. As we continue to grow, we remain dedicated to supporting farmers and contributing to a stronger and more productive agricultural future.",
  ],
} as const;

export const products = [
  {
    name: "Onion Seeds",
    variant: "ONS Packet - Gandh Gulabi Variety",
    description:
      "High-quality onion seeds developed to support reliable crop performance, strong field results, and farmer confidence.",
    highlights: [
      "Focused on dependable crop performance",
      "Selected with quality and consistency in mind",
      "Built for productive and sustainable farming",
    ],
    image: onionSeedImage,
  },
  {
    name: "Chia Seeds",
    variant: "Premium Seed Offering",
    description:
      "Quality chia seeds backed by a farmer-first approach and a commitment to dependable seed solutions.",
    highlights: [
      "Supports diversified seed requirements",
      "Aligned with strict quality standards",
      "Created to strengthen farm success",
    ],
    image: chiaSeedImage,
  },
] as const;

export const values = [
  {
    title: "Integrity",
    description:
      "We uphold honesty, transparency, and strong ethics in every relationship and decision.",
  },
  {
    title: "Quality",
    description:
      "We are dedicated to delivering superior seeds that ensure reliability and consistent crop performance.",
  },
  {
    title: "Farmer Focus",
    description:
      "Farmers are at the center of everything we do, and we work to support their growth and success.",
  },
  {
    title: "Commitment",
    description:
      "We remain committed to excellence, delivering dependable products and lasting partnerships.",
  },
  {
    title: "Transparency",
    description:
      "We believe in open communication and accountability with farmers, partners, and stakeholders.",
  },
  {
    title: "Innovation",
    description:
      "We continuously pursue new ideas and advancements to develop better seeds for the future of farming.",
  },
] as const;

export const mediaInsights = [
  {
    label: "Product Focus",
    title: "Seed Portfolio Highlights",
    description:
      "Explore Agrogandh's product range, including onion seeds and chia seeds developed with reliability and farmer success in mind.",
  },
  {
    label: "Farmer Guidance",
    title: "Practical Crop Support",
    description:
      "Stay connected with useful insights around seed selection, crop performance, and dependable farming support.",
  },
  {
    label: "Company Updates",
    title: "Media & Insights",
    description:
      "Follow our journey as we focus on innovation, strict quality standards, and sustainable agricultural growth.",
  },
] as const;
