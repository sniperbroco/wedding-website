import { useEffect, useMemo, useState } from "react";
import { getRsvps } from "../services/weddingApi";

const filters = [
  ["all", "All"],
  ["attending", "Attending"],
  ["declined", "Not attending"],
  ["pending", "Pending"],
];

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getRsvps();
    setRsvps(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const attending = rsvps.filter((rsvp) => rsvp.attendance === "attending");
    const declined = rsvps.filter((rsvp) => rsvp.attendance === "declined");
    const pending = rsvps.filter((rsvp) => rsvp.attendance === "pending");

    return {
      total: rsvps.length,
      responded: attending.length + declined.length,
      attending: attending.length,
      declined: declined.length,
      pending: pending.length,
      guests: attending.reduce((sum, rsvp) => sum + rsvp.guestCount, 0),
    };
  }, [rsvps]);

  const filtered = rsvps.filter((rsvp) => {
    const matchesFilter = filter === "all" || rsvp.attendance === filter;
    const matchesSearch = rsvp.guestName.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <span className="eyebrow">Wedding Administration</span>
          <h1>RSVP Tracker</h1>
          <p>Monitor guest responses for {new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date("2026-10-08"))}.</p>
        </div>
        <button className="button button-outline" onClick={load}>Refresh</button>
      </header>

      <section className="stats-grid">
        <div className="stat-card"><span>Total Invited</span><strong>{stats.total}</strong></div>
        <div className="stat-card"><span>Responded</span><strong>{stats.responded}</strong></div>
        <div className="stat-card"><span>Attending</span><strong>{stats.attending}</strong></div>
        <div className="stat-card"><span>Not Attending</span><strong>{stats.declined}</strong></div>
        <div className="stat-card"><span>Pending</span><strong>{stats.pending}</strong></div>
        <div className="stat-card stat-card-accent"><span>Total Guests</span><strong>{stats.guests}</strong></div>
      </section>

      <section className="tracker-panel">
        <div className="tracker-toolbar">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guests..."
            aria-label="Search guests"
          />
          <div className="filter-group">
            {filters.map(([value, label]) => (
              <button
                key={value}
                className={filter === value ? "filter active" : "filter"}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Attendance</th>
                <th>Guests</th>
                <th>RSVP Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="empty-state">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="4" className="empty-state">No guests found.</td></tr>
              ) : (
                filtered.map((rsvp) => (
                  <tr key={rsvp.inviteId}>
                    <td>
                      <strong>{rsvp.guestName}</strong>
                      <small>{rsvp.inviteId}</small>
                    </td>
                    <td>
                      <span className={`status status-${rsvp.attendance}`}>
                        {rsvp.attendance === "attending" ? "Attending" :
                          rsvp.attendance === "declined" ? "Not attending" : "Pending"}
                      </span>
                    </td>
                    <td>{rsvp.guestCount}</td>
                    <td>{formatDate(rsvp.submittedAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
