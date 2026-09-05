import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WeddingDetails from "../components/WeddingDetails";
import Schedule from "../components/Schedule";
import Location from "../components/Location";
import Countdown from "../components/Countdown";
import RSVPSection from "../components/RSVPSection";
import Gallery from "../components/Gallery";
import Message from "../components/Message";
import Envelope from "../components/Envelope";
import { wedding } from "../data/wedding";
import { getInvitation } from "../services/weddingApi";

function getInviteId() {
  const match = window.location.pathname.match(/^\/invite\/([^/]+)/i);
  return match?.[1]?.toUpperCase() || null;
}

export default function WeddingInvitation() {
  const [invitation, setInvitation] = useState(null);
  const [error, setError] = useState("");
  const [showEnvelope, setShowEnvelope] = useState(true);

  useEffect(() => {
    getInvitation(getInviteId())
      .then(setInvitation)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    document.body.style.overflow = showEnvelope ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEnvelope]);

  function handleEnvelopeOpen() {
    setShowEnvelope(false);
  }

  let content;

  if (error) {
    content = (
      <main className="not-found">
        <span className="eyebrow">Invitation</span>
        <h1>Invitation not found</h1>
        <p>Please check that you are using the personalized invitation link provided to you.</p>
      </main>
    );
  } else if (!invitation) {
    content = <main className="loading-screen">Loading your invitation...</main>;
  } else {
    content = (
      <>
        <Navbar />
        <main>
          <Hero wedding={wedding} invitation={invitation} />
          <Countdown target={wedding.dateTime} />
          <Gallery />
          <WeddingDetails wedding={wedding} />
          <Schedule wedding={wedding} />
          <Location wedding={wedding} />
          <RSVPSection invitation={invitation} />
          <Message wedding={wedding} />
        </main>
        <footer className="footer">
          <p>{wedding.couple.partnerOne} &amp; {wedding.couple.partnerTwo}</p>
          <span>{wedding.date}</span>
        </footer>
      </>
    );
  }

  return (
    <>
      {showEnvelope && <Envelope wedding={wedding} onOpen={handleEnvelopeOpen} />}
      {content}
    </>
  );
}
