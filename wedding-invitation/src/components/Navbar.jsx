import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="brand">
        <img src={logo} alt="Christine & Lence" className="brand-logo" />
      </a>
      <div className="nav-links">
        <a href="#details">Details</a>
        <a href="#schedule">Schedule</a>
        <a href="#location">Location</a>
        <a href="#rsvp">RSVP</a>
      </div>
    </nav>
  );
}
