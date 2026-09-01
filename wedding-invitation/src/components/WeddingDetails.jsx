import SectionHeading from "./SectionHeading";

export default function WeddingDetails({ wedding }) {
  return (
    <section className="section details-section" id="details">
      <SectionHeading
        eyebrow="The Details"
        title="A day to remember"
        description="An intimate celebration surrounded by the people who matter most to us."
      />
      <div className="details-grid">
        <article className="detail-card">
          <span className="detail-number">01</span>
          <h3>Date</h3>
          <p>{wedding.date}</p>
          <span>{wedding.time}</span>
        </article>
        <article className="detail-card">
          <span className="detail-number">02</span>
          <h3>Reception</h3>
          <p>{wedding.venue}</p>
          <span>{wedding.address}</span>
        </article>
        <article className="detail-card">
          <span className="detail-number">03</span>
          <h3>Dress Code</h3>
          <p>Elegant &amp; Formal</p>
          <span>Burgundy, black &amp; timeless neutrals</span>
        </article>
      </div>
    </section>
  );
}
