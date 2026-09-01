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
import { wedding } from "../data/wedding";
import { getInvitation } from "../services/weddingApi";

function getInviteId() {
  const match = window.location.pathname.match(/^\/invite\/([^/]+)/i);
  return match?.[1]?.toUpperCase() || null;
}

export default function WeddingInvitation() {
  const [invitation, setInvitation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getInvitation(getInviteId())
      .then(setInvitation)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <main className="not-found">
        <span className="eyebrow">Invitation</span>
        <h1>Invitation not found</h1>
        <p>Please check that you are using the personalized invitation link provided to you.</p>
      </main>
    );
  }

  if (!invitation) {
    return <main className="loading-screen">Loading your invitation...</main>;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero wedding={wedding} invitation={invitation} />
        <WeddingDetails wedding={wedding} />
        <Schedule wedding={wedding} />
        <Location wedding={wedding} />
        <Countdown target={wedding.dateTime} />
        <RSVPSection invitation={invitation} />
        <Gallery />
        <Message wedding={wedding} />
      </main>
      <footer className="footer">
        <p>{wedding.couple.partnerOne} &amp; {wedding.couple.partnerTwo}</p>
        <span>{wedding.date}</span>
      </footer>
    </>
  );
}
