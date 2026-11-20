import type { VercelRequest, VercelResponse } from "@vercel/node";

// Emails each website lead to Stefanie through Resend. Needs RESEND_API_KEY,
// LEAD_FROM_EMAIL (on the verified stefaniepollack.com domain) and
// LEAD_TO_EMAIL in the Vercel project. Self-contained like the other api files.

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !from || !to) {
    res.status(500).json({ ok: false, error: "Email not configured" });
    return;
  }

  const body = (typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body) ?? {};
  const field = (k: string) => String(body[k] ?? "").trim().slice(0, 4000);
  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const message = field("message");
  const source = field("source") || "Website";
  if (!email.includes("@")) {
    res.status(400).json({ ok: false, error: "Invalid email" });
    return;
  }

  const rows: [string, string][] = [
    ["Source", source],
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Message", message],
  ];
  const html =
    `<h2 style="font-family:sans-serif">New website lead: ${esc(source)}</h2><table style="font-family:sans-serif;font-size:14px">` +
    rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${k}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
      .join("") +
    "</table>";

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject: `New lead (${source}): ${name || email}`,
      html,
    }),
  });
  res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
