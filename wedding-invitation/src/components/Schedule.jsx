import SectionHeading from "./SectionHeading";

export default function Schedule({ wedding }) {
  return (
    <section className="section dark-section" id="schedule">
      <SectionHeading
        eyebrow="The Celebration"
        title="Our schedule"
        description="A simple afternoon shared with our closest family and friends."
      />
      <div className="timeline">
        {wedding.schedule.map((item, index) => (
          <div className="timeline-item" key={`${item.time}-${index}`}>
            <div className="timeline-time">{item.time}</div>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
