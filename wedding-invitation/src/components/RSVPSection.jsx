import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { submitRsvp } from "../services/weddingApi";

export default function RSVPSection({ invitation }) {
  const [attendance, setAttendance] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState({ status: "idle", message: "" });

  if (!invitation) return null;

  if (invitation.submitted || invitation.status === "attending" || invitation.status === "declined") {
    return (
      <section className="section rsvp-section" id="rsvp">
        <SectionHeading eyebrow="RSVP" title="We've received your response" />
        <div className="confirmation-card">
          <span className="confirmation-mark">✓</span>
          <h3>Thank you, {invitation.guestName}.</h3>
          <p>Your RSVP for this invitation has already been submitted.</p>
        </div>
      </section>
    );
  }

  const deadline = new Date("2026-09-30T23:59:59+08:00");
  const closed = Date.now() > deadline;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!attendance) {
      setState({ status: "error", message: "Please let us know whether you will be attending." });
      return;
    }

    try {
      await submitRsvp({
        inviteId: invitation.inviteId,
        guestName: invitation.guestName,
        attendance,
        guestCount: attendance === "attending" ? Number(guestCount) : 0,
        email: email.trim(),
        mobile: mobile.trim(),
        message: message.trim(),
      });

      setState({ status: "success", message: "Your RSVP has been received." });
    } catch (error) {
      setState({ status: "error", message: error.message });
    }
  }

  if (closed) {
    return (
      <section className="section rsvp-section" id="rsvp">
        <SectionHeading eyebrow="RSVP" title="RSVPs are closed" />
        <div className="confirmation-card">
          <p>Thank you for your response and for being part of our celebration.</p>
        </div>
      </section>
    );
  }

  if (state.status === "success") {
    return (
      <section className="section rsvp-section" id="rsvp">
        <SectionHeading eyebrow="RSVP" title="Thank you!" />
        <div className="confirmation-card">
          <span className="confirmation-mark">✓</span>
          <h3>Your RSVP has been received.</h3>
          <p>We look forward to celebrating with you, {invitation.guestName}.</p>
          <p className="small-note">A confirmation email will be sent to {email}.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section rsvp-section" id="rsvp">
      <SectionHeading
        eyebrow="RSVP"
        title={`Will you join us, ${invitation.guestName}?`}
        description={`Please respond by September 30, 2026. This invitation is for up to ${invitation.maxGuests} guest${invitation.maxGuests === 1 ? "" : "s"}.`}
      />

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Will you be attending?</legend>
          <div className="attendance-options">
            <label className={`choice ${attendance === "attending" ? "selected" : ""}`}>
              <input
                type="radio"
                name="attendance"
                value="attending"
                checked={attendance === "attending"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              <span>Joyfully attending</span>
            </label>
            <label className={`choice ${attendance === "declined" ? "selected" : ""}`}>
              <input
                type="radio"
                name="attendance"
                value="declined"
                checked={attendance === "declined"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              <span>Unable to attend</span>
            </label>
          </div>
        </fieldset>

        {attendance === "attending" && (
          <label>
            <span>Number of guests attending</span>
            <select value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))}>
              {Array.from({ length: invitation.maxGuests }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </label>
        )}

        <div className="form-grid">
          <label>
            <span>Email address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            <span>Mobile number</span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="09XX XXX XXXX"
            />
          </label>
        </div>

        <label>
          <span>Message <em>(optional)</em></span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message for the couple..."
            rows="4"
            maxLength="500"
          />
        </label>

        {state.status === "error" && <p className="form-error">{state.message}</p>}

        <button className="button button-dark" type="submit">
          Submit RSVP
        </button>
      </form>
    </section>
  );
}
