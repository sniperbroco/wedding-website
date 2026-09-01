import SectionHeading from "./SectionHeading";

const galleryItems = [
  { title: "A moment together", className: "gallery-tall" },
  { title: "Forever begins here", className: "gallery-wide" },
  { title: "Our story", className: "gallery-square" },
  { title: "With love", className: "gallery-square" },
];

export default function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <SectionHeading
        eyebrow="Our Memories"
        title="A few moments of us"
        description="Photos will be added here as the invitation is finalized."
      />
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div className={`gallery-card ${item.className}`} key={item.title}>
            <span>Photo {index + 1}</span>
            <strong>{item.title}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
