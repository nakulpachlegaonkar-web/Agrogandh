import cropImage from "./public/images/seeds/crop.png";
import onionHeroImage from "./public/images/seeds/onion.png";
import onionCollectionImage from "./public/images/seeds/onion2.jpg";
import onionSeedsImage from "./public/images/seeds/onionseeds.png";

type DesignImageSlot = string | null;

export const designImages: {
  hero: DesignImageSlot;
  storyField: DesignImageSlot;
  values: DesignImageSlot;
  collection: DesignImageSlot;
} = {
  hero: onionHeroImage,
  storyField: cropImage,
  values: onionSeedsImage,
  collection: onionCollectionImage,
};
