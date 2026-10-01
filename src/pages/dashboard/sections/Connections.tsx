import ConnectionPanel from "../components/ConnectionPanel";
import { SectionHead, Shell } from "../components/Chrome";
import { useReport } from "../session";

/**
 * The setup, in the order it has to happen.
 *
 * This site starts from nothing: there is no Tag Manager container and no GA4
 * tag in index.html, so step 1 is creating somewhere for visits to go. The
 * tag itself is installed by setting the measurement ID — see
 * src/components/feature/Analytics.tsx.
 */
const STEPS: [string, string][] = [
  [
    "Create the GA4 property and its web stream",
    "analytics.google.com → Admin → Create → Property, then add a Web data stream for www.stefaniepollack.com. Copy the stream's measurement ID (G-…) into VITE_GA4_MEASUREMENT_ID. That variable installs the tag on every page at the next deploy — this is the step that matters most, because analytics is not retrospective and every day without it is a day that cannot be recovered.",
  ],
  [
    "Find the numeric property ID",
    "analytics.google.com → Admin → Property details. This is a number, and it is not the G- measurement ID; both exist and they are used for different things. It goes in GA4_PROPERTY_ID.",
  ],
  [
    "Make, or reuse, a service account",
    'console.cloud.google.com → IAM → Service Accounts → create, then add a JSON key. Enable the "Google Analytics Data API" and the "Search Console API" for that project. An existing service account works just as well; it only needs access granted in the next step.',
  ],
  [
    "Grant it read access on both properties",
    "In GA4: Admin → Property access management → add the service account email as Viewer. In Search Console: if stefaniepollack.com is not there yet, add it as a Domain property and verify it with the DNS record Google gives you; then Settings → Users and permissions → add the service account as a Restricted user. Skipping the access step is what produces a 403 once the keys are already in.",
  ],
  [
    "Add the variables",
    "Locally in .env.local; on Vercel in Project → Settings → Environment Variables. Then redeploy. Only the measurement ID is VITE_-prefixed, because the tag needs it in the browser and it is public anyway; the property ID, service account and key never leave the server.",
  ],
];

export default function Connections() {
  const { days, sources } = useReport();
  const live = sources.filter((s) => s.state === "live").length;

  return (
    <Shell>
      <SectionHead
        title="Connections"
        lead="What is feeding this dashboard, and what is still missing. These steps only need doing once, and only someone with the Google account can do them."
        days={days}
        basePath="/dashboard/connections"
        showRange={false}
      />

      <div className="dash-row dash-row-2 dash-row-top">
        <ConnectionPanel sources={sources} />

        <div className="dash-card">
          <h2 className="dash-card-title">How to connect it</h2>
          <p className="dash-lead">
            Analytics is not retrospective. History begins the day a GA4 tag starts recording, so the sooner
            step&nbsp;1 is done, the sooner there is anything to look at.
          </p>

          <ol className="dash-steps">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="dash-step">
                <span className="dash-step-n">{i + 1}</span>
                <div>
                  <p className="dash-step-title">{title}</p>
                  <p className="dash-step-body">{body}</p>
                </div>
              </li>
            ))}
          </ol>

          {live === sources.length ? (
            <p className="dash-all-good">All three sources are live. Nothing here needs doing.</p>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}
