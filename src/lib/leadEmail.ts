/** Emails a website lead to Stefanie via /api/lead (Resend). Never throws. */
export async function emailLead(lead: {
  source: string;
  email: string;
  name?: string;
  phone?: string;
  message?: string;
}): Promise<boolean> {
  try {
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return r.ok;
  } catch {
    return false;
  }
}
