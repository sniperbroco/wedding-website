import SectionHeading from "./SectionHeading";

export default function Location({ wedding }) {
  return (
    <section className="section location-section" id="location">
      <SectionHeading
        eyebrow="Find Us"
        title="The location"
        description="We can't wait to celebrate with you."
      />
      <div className="location-card">
        {/* <div className="map-placeholder" aria-label="Google Maps preview placeholder">
          <div className="map-pin">♥</div>
          <span>Google Maps Preview</span>
        </div> */}
        <div className="map-container">
          <iframe
            src={wedding.mapsEmbedUrl}
            title={`Map showing ${wedding.venue}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="location-info">
          <span className="eyebrow">Venue</span>
          <h3>{wedding.venue}</h3>
          <p>{wedding.address}</p>
          <a
            className="button button-dark"
            href={wedding.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
