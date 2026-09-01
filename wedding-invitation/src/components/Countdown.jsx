import { useEffect, useState } from "react";

function getRemaining(target) {
  const difference = new Date(target).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: false,
  };
}

export default function Countdown({ target }) {
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemaining(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <section className="countdown-section">
      <span className="eyebrow">Counting the moments</span>
      <h2>{remaining.finished ? "Today is the day!" : "Until we say I do"}</h2>
      {!remaining.finished && (
        <div className="countdown-grid">
          {[
            ["Days", remaining.days],
            ["Hours", remaining.hours],
            ["Minutes", remaining.minutes],
            ["Seconds", remaining.seconds],
          ].map(([label, value]) => (
            <div className="countdown-item" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
