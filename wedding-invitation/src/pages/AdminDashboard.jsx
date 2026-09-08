import { useEffect, useMemo, useState } from "react";
import { createInvite, deleteInvite, getRsvps, updateInvite } from "../services/weddingApi";

const filters = [
  ["all", "All"],
  ["attending", "Attending"],
  ["declined", "Not attending"],
  ["pending", "Pending"],
];

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PencilIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

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

  const [guestName, setGuestName] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createdInvite, setCreatedInvite] = useState(null);

  async function load({ silent = false } = {}) {
    if (!silent) setLoading(true);
    const data = await getRsvps();
    setRsvps(data);
    if (!silent) setLoading(false);
  }

  async function handleCreateInvite(event) {
    event.preventDefault();

    if (!guestName.trim()) {
      setCreateError("Guest name is required.");
      return;
    }

    setCreating(true);
    setCreateError("");

    try {
      const invitation = await createInvite({
        guestName: guestName.trim(),
        maxGuests: Number(maxGuests),
      });

      setCreatedInvite(invitation);
      setGuestName("");
      setMaxGuests(1);
      await load();
    } catch (error) {
      setCreateError(error.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(createdInvite.invitationLink);
  }

  const [editingId, setEditingId] = useState(null);
  const [editGuestName, setEditGuestName] = useState("");
  const [editMaxGuests, setEditMaxGuests] = useState(1);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  function startEdit(rsvp) {
    setEditingId(rsvp.inviteId);
    setEditGuestName(rsvp.guestName);
    setEditMaxGuests(rsvp.maxGuests);
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditError("");
  }

  async function saveEdit(inviteId) {
    if (!editGuestName.trim()) {
      setEditError("Guest name is required.");
      return;
    }

    setSavingEdit(true);
    setEditError("");

    try {
      await updateInvite({
        inviteId,
        guestName: editGuestName.trim(),
        maxGuests: Number(editMaxGuests),
      });

      setEditingId(null);
      await load();
    } catch (error) {
      setEditError(error.message);
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete(rsvp) {
    const confirmed = window.confirm(
      `Delete invite for ${rsvp.guestName}? This cannot be undone.`
    );

    if (!confirmed) return;

    await deleteInvite(rsvp.inviteId);
    await load();
  }

  async function handleCopyRowLink(rsvp) {
    await navigator.clipboard.writeText(rsvp.invitationLink);
    setCopiedId(rsvp.inviteId);
    setTimeout(() => setCopiedId(null), 1500);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    const interval = setInterval(() => load({ silent: true }), 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const attending = rsvps.filter((rsvp) => rsvp.attendance === "attending");
    const declined = rsvps.filter((rsvp) => rsvp.attendance === "declined");
    const pending = rsvps.filter((rsvp) => rsvp.attendance === "pending");

    return {
      responded: attending.length + declined.length,
      attending: attending.length,
      declined: declined.length,
      pending: pending.length,
      expectedGuests: rsvps.reduce((sum, rsvp) => sum + rsvp.maxGuests, 0),
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

      <section className="add-guest-panel">
        <h2>Add Guest</h2>
        <form className="add-guest-form" onSubmit={handleCreateInvite}>
          <label>
            <span>Guest name</span>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Guest name"
            />
          </label>
          <label>
            <span>Max guests</span>
            <input
              type="number"
              min="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </label>
          <button className="button button-dark" type="submit" disabled={creating}>
            {creating ? "Creating..." : "Create Invite"}
          </button>
        </form>

        {createError && <p className="form-error">{createError}</p>}

        {createdInvite && (
          <div className="invite-result">
            <span>
              Invite created for <strong>{createdInvite.guestName}</strong> ({createdInvite.inviteId})
            </span>
            <div className="invite-link-row">
              <code>{createdInvite.invitationLink}</code>
              <button className="button button-outline" type="button" onClick={handleCopyLink}>
                Copy link
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="stats-grid">
        <div className="stat-card"><span>Total Expected Guests</span><strong>{stats.expectedGuests}</strong></div>
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
                <th>Message</th>
                <th>RSVP Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="empty-state">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="empty-state">No guests found.</td></tr>
              ) : (
                filtered.map((rsvp) => {
                  const isEditing = editingId === rsvp.inviteId;

                  return (
                    <tr key={rsvp.inviteId}>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editGuestName}
                            onChange={(e) => setEditGuestName(e.target.value)}
                          />
                        ) : (
                          <>
                            <strong>{rsvp.guestName}</strong>
                            <small>{rsvp.inviteId}</small>
                          </>
                        )}
                      </td>
                      <td>
                        <span className={`status status-${rsvp.attendance}`}>
                          {rsvp.attendance === "attending" ? "Attending" :
                            rsvp.attendance === "declined" ? "Not attending" : "Pending"}
                        </span>
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={editMaxGuests}
                            onChange={(e) => setEditMaxGuests(e.target.value)}
                          />
                        ) : (
                          rsvp.guestCount
                        )}
                      </td>
                      <td>{rsvp.message || "—"}</td>
                      <td>{formatDate(rsvp.submittedAt)}</td>
                      <td>
                        {isEditing ? (
                          <div className="table-actions">
                            <button
                              className="button button-dark"
                              type="button"
                              disabled={savingEdit}
                              onClick={() => saveEdit(rsvp.inviteId)}
                            >
                              {savingEdit ? "Saving..." : "Save"}
                            </button>
                            <button className="button button-outline" type="button" onClick={cancelEdit}>
                              Cancel
                            </button>
                            {editError && <p className="form-error">{editError}</p>}
                          </div>
                        ) : (
                          <div className="table-actions">
                            <button
                              className="button button-outline"
                              type="button"
                              title="Copy Link"
                              aria-label="Copy Link"
                              onClick={() => handleCopyRowLink(rsvp)}
                            >
                              <LinkIcon className="btn-icon" />
                              <span className="btn-label">{copiedId === rsvp.inviteId ? "Copied!" : "Copy Link"}</span>
                            </button>
                            <button
                              className="button button-outline"
                              type="button"
                              title="Edit"
                              aria-label="Edit"
                              onClick={() => startEdit(rsvp)}
                            >
                              <PencilIcon className="btn-icon" />
                              <span className="btn-label">Edit</span>
                            </button>
                            <button
                              className="button button-danger"
                              type="button"
                              title="Delete"
                              aria-label="Delete"
                              onClick={() => handleDelete(rsvp)}
                            >
                              <TrashIcon className="btn-icon" />
                              <span className="btn-label">Delete</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
