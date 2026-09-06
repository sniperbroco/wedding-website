import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WeddingDetails from "../components/WeddingDetails";
import Schedule from "../components/Schedule";
import Location from "../components/Location";
import Countdown from "../components/Countdown";
import RSVPSection from "../components/RSVPSection";
import GiftGuide from "../components/GiftGuide";
import Gallery from "../components/Gallery";
import Message from "../components/Message";
import Envelope from "../components/Envelope";
import ScrollHint from "../components/ScrollHint";
import { wedding } from "../data/wedding";
import { getInvitation } from "../services/weddingApi";
import song from "../assets/Juris Fernandez - Forevermore (Lyrics).mp3";

function getInviteId() {
  const match = window.location.pathname.match(/^\/invite\/([^/]+)/i);
  return match?.[1]?.toUpperCase() || null;
}

export default function WeddingInvitation() {
  const [invitation, setInvitation] = useState(null);
  const [error, setError] = useState("");
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

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

  function handleSealTap() {
    const audio = audioRef.current;
    if (!audio) return;

    // Safari only allows play() as a direct, synchronous result of the user
    // gesture, so it's called first; seeking to 0:47 happens right after
    // (or once metadata is available, if it hasn't loaded yet).
    audio.play().catch(() => {});
    if (audio.readyState >= 1) {
      audio.currentTime = 47;
    } else {
      audio.addEventListener(
        "loadedmetadata",
        () => {
          audio.currentTime = 47;
        },
        { once: true }
      );
    }
    setMusicPlaying(true);
  }

  function toggleMute() {
    setMuted((prev) => !prev);
  }

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
        <ScrollHint />
        <main>
          <Hero wedding={wedding} invitation={invitation} />
          <Countdown target={wedding.dateTime} />
          <Gallery />
          <WeddingDetails wedding={wedding} />
          <Schedule wedding={wedding} />
          <Location wedding={wedding} />
          <GiftGuide />
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
      {showEnvelope && (
        <Envelope wedding={wedding} onOpen={handleEnvelopeOpen} onSealTap={handleSealTap} />
      )}
      {content}
      <audio ref={audioRef} src={song} preload="auto" loop muted={muted} />
      {musicPlaying && (
        <button
          type="button"
          className="music-toggle"
          onClick={toggleMute}
          aria-label={muted ? "Unmute background music" : "Mute background music"}
        >
          {muted ? "♪ Muted" : "♪ Playing"}
        </button>
      )}
    </>
  );
}
