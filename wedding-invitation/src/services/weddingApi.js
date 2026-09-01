const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    throw new Error(
      "VITE_API_URL environment variable is not defined. Add VITE_API_URL to your .env file."
    );
  }
  return url;
})();

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

/**
 * Get invitation details using the personalized invite ID.
 *
 * Example:
 * /invite/INV001
 */
export async function getInvitation(inviteId) {
  const url = `${API_URL}?action=invitation&inviteId=${encodeURIComponent(
    inviteId
  )}`;

  const data = await request(url);

  return data.invitation;
}

/**
 * Submit an RSVP.
 */
export async function submitRsvp(rsvp) {
  const data = await request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "submitRsvp",
      ...rsvp,
    }),
  });

  return data;
}

/**
 * Get all invitations + RSVP information.
 *
 * Used by the admin dashboard.
 */
export async function getRsvps() {
  const url = `${API_URL}?action=rsvps`;

  const data = await request(url);

  return data.rsvps;
}