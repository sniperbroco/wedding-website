import SectionHeading from "./SectionHeading";
import photo1 from "../assets/photos/Unknown-11.jpg";
import photo2 from "../assets/photos/Unknown-12.jpg";
import photo3 from "../assets/photos/Unknown-13.jpg";
import photo4 from "../assets/photos/Unknown-14.jpg";
import photo5 from "../assets/photos/Unknown-15.jpg";
import photo6 from "../assets/photos/Unknown-16.jpg";
import photo7 from "../assets/photos/Unknown-17.jpg";

const galleryItems = [
  { type: "photo", src: photo1, className: "gallery-tall" },
  { type: "photo", src: photo2, className: "" },
  { type: "photo", src: photo3, className: "" },
  { type: "photo", src: photo4, className: "gallery-wide" },
  { type: "photo", src: photo5, className: "", imgPosition: "center 35%" },
  { type: "photo", src: photo6, className: "gallery-tall" },
  { type: "photo", src: photo7, className: "" },
  {
    type: "quote",
    text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    attribution: "",
  },
  {
    type: "quote",
    text: "From two teenagers to partners for life — this is only the beginning.",
  },
];

export default function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <SectionHeading
        eyebrow="How it began"
        title="Our Story"
        description={`Long before they dreamed of forever, they were just two teenagers who happened to meet during a Senior High School Drum and Lyre Corps competition.

        Their story began through practices, shared moments, and Lence’s efforts to win Christine’s heart. After all his persistence, Christine finally said yes—and that simple “yes” became the beginning of their journey together.

        When college came, life took them to different places. Lence was in Cebu, while Christine was in Manila. They became an LDR couple, learning to love through distance and cherish every reunion whenever the holidays brought them home to the province.

        Years passed, and they grew together through different seasons of life. Now, 10 years later, what started as a high school romance has become a love they’re ready to carry into forever.

        The two teenagers who once met at a Drum and Lyre Corps practice are now ready to begin their greatest chapter yet—not just as sweethearts, but as partners for life.

        From that first “yes” to forever, their story continues. 🤍`}
      />
      <div className="gallery-grid">
        {galleryItems.map((item, index) =>
          item.type === "quote" ? (
            <div className="gallery-card gallery-quote" key={item.text}>
              <span className="gallery-quote-mark">&ldquo;</span>
              <p>{item.text}</p>
              {item.attribution && <span className="gallery-quote-attribution">{item.attribution}</span>}
            </div>
          ) : (
            <div className={`gallery-card ${item.className}`} key={item.src}>
              <img
                src={item.src}
                alt={`Christine and Lence memory ${index + 1}`}
                style={item.imgPosition ? { objectPosition: item.imgPosition } : undefined}
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}
