export default function Hero({ wedding, invitation }) {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">{wedding.title}</p>
        <p className="hero-intro">Together with our families,</p>
        <h1>
          <span>{wedding.couple.partnerOne}</span> <span id="and"> & </span> <span>{wedding.couple.partnerTwo}</span>
        </h1>
        <div className="hero-rule" />
        <p className="hero-date">{wedding.date} · {wedding.time}</p>
        {invitation && (
          <p className="hero-guest">
            With love, we invite <strong>{invitation.guestName}</strong>
          </p>
        )}
        <a className="button button-light" href="#rsvp">RSVP</a>
      </div>
    </section>
  );
}
