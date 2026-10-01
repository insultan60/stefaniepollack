import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearReports } from "../session";

/** Only ever return to a path on this site. An attacker-supplied ?next=
 *  pointing at another origin would turn the sign-in into an open redirect. */
function safeNext(raw: string | null): string {
  return raw && raw.startsWith("/dashboard") && !raw.startsWith("//") ? raw : "/dashboard";
}

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        clearReports();
        navigate(safeNext(params.get("next")), { replace: true });
        return;
      }
      setError(
        res.status === 401
          ? "That password was not correct."
          : res.status === 503
            ? "The dashboard is not configured yet. DASHBOARD_PASSWORD has to be set on the host."
            : `Sign-in failed (${res.status}).`,
      );
    } catch {
      setError("Could not reach the server. Check the connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="dash-login">
      <div className="dash-login-inner">
        <p className="dash-login-eyebrow">Stefanie Pollack</p>
        <h1 className="dash-login-title">Performance dashboard</h1>
        <p className="dash-login-lead">This page is private. Enter the dashboard password to continue.</p>

        <form onSubmit={submit} className="dash-login-form">
          <label htmlFor="password" className="visually-hidden">
            Dashboard password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dash-login-input"
            placeholder="Password"
          />

          {error ? (
            <p role="alert" className="dash-login-error">
              {error}
            </p>
          ) : null}

          <button type="submit" className="dash-login-btn" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
