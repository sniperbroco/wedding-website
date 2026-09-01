export default function Message({ wedding }) {
  return (
    <section className="message-section">
      <div className="message-inner">
        <span className="ornament">✦</span>
        <p className="quote">“{wedding.quote}”</p>
        <p>{wedding.message}</p>
        <div className="signature">
          <span>{wedding.couple.partnerOne}</span>
          <small>&amp;</small>
          <span>{wedding.couple.partnerTwo}</span>
        </div>
      </div>
    </section>
  );
}
