import type { CSSProperties } from "react";

export type VerticalImageGalleryItem = {
  src: string;
  alt: string;
  label: string;
};

type VerticalImageGalleryProps = {
  items: VerticalImageGalleryItem[];
  durationMs?: number;
  className?: string;
};

export default function VerticalImageGallery({
  items,
  durationMs = 14000,
  className,
}: VerticalImageGalleryProps) {
  const isAnimated = items.length > 1;
  const galleryItems = isAnimated ? [...items, ...items] : items;

  const galleryStyle = {
    "--gallery-duration": `${durationMs}ms`,
    "--gallery-items": items.length,
  } as CSSProperties;

  return (
    <div
      className={`vertical-image-gallery${
        isAnimated ? " vertical-image-gallery--animated" : ""
      }${className ? ` ${className}` : ""}`}
      style={galleryStyle}
    >
      <div className="vertical-image-gallery__track">
        {galleryItems.map((item, index) => {
          const isDuplicate = isAnimated && index >= items.length;

          return (
            <figure
              key={`${item.alt}-${index}`}
              className="vertical-image-gallery__card"
              aria-hidden={isDuplicate || undefined}
            >
              <img src={item.src} alt={isDuplicate ? "" : item.alt} />
              <figcaption>{item.label}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}