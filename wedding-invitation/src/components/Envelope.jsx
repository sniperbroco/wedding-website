import { useState } from "react";
import flowerLeft from "../assets/1.png";
import flowerRight from "../assets/2.png";
import logo from "../assets/logo.png";

export default function Envelope({ wedding, onOpen }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    if (open) return;
    setOpen(true);
    setTimeout(onOpen, 1900);
  }

  return (
    <div className={`envelope-overlay ${open ? "is-open" : ""}`}>
      <div className="envelope-scene">
        <div className="envelope-invite-heading">
          <p className="envelope-invite-label">You&apos;re Invited!</p>
          {/* <p className="envelope-invite-names">
            <span>{wedding.couple.partnerOne} &{" "}</span>
            <span>{wedding.couple.partnerTwo}</span>
          </p> */}
        </div>

        <div className="envelope">
          <img
            src={flowerLeft}
            alt=""
            aria-hidden="true"
            className="envelope-flower envelope-flower-left"
          />
          <img
            src={flowerRight}
            alt=""
            aria-hidden="true"
            className="envelope-flower envelope-flower-right"
          />

          {/* Back/base paper */}
          <div className="envelope-body" />

          {/* Opening flap */}
          <div className="envelope-flap" />
          {/* <div className="envelope-flap-shadow" /> */}

          {/* Three separate folded planes */}
          <div className="envelope-fold-left" />
          <div className="envelope-fold-right" />

          {/* Main front pocket */}
          <div className="envelope-pocket" />

          <div className="envelope-frame" />

          <div className="envelope-date">
            <span className="ornament">✦</span>
            <p>{wedding.date}</p>
          </div>

          <button
            type="button"
            className="envelope-seal"
            onClick={handleOpen}
            aria-label="Open invitation"
          >
            <img src={logo} alt="" className="envelope-seal-logo" />
          </button>
        </div>

        <p className="envelope-hint">Tap the seal to open</p>
      </div>
    </div>
  );
}
