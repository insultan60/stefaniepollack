import PagesTable from "../components/PagesTable";
import { NotLiveBanner, SectionHead, Shell } from "../components/Chrome";
import { Card } from "../components/panels";
import { SITE_PAGES, pageRows } from "../sitePages";
import { useReport } from "../session";

/** Group counts come from the route registry, so they are correct whether or
 *  not anything is measuring — they describe the site, not its traffic. */
const GROUPS = ["Core", "Services", "Listings", "Content"] as const;

export default function Pages() {
  const { days, ga, incomplete, collecting } = useReport();
  const rows = pageRows(ga);

  return (
    <Shell>
      <SectionHead
        title="Pages"
        lead="Every public page on the site, and how much of the reading each one accounts for."
        days={days}
        basePath="/dashboard/pages"
      />

      {incomplete ? <NotLiveBanner collecting={collecting} /> : null}

      <div className="dash-groups">
        {GROUPS.map((g) => {
          const n = SITE_PAGES.filter((p) => p.group === g).length;
          return (
            <div key={g} className="dash-group">
              <p className="dash-group-name">{g}</p>
              <p className="dash-group-n">{n}</p>
              <p className="dash-group-unit">{n === 1 ? "page" : "pages"}</p>
            </div>
          );
        })}
      </div>

      <div className="dash-row">
        <Card
          title={ga.live ? "Measured pages" : "All pages"}
          hint={
            ga.live
              ? `Views and users over the last ${days} days`
              : "The site as it stands, every route reading zero"
          }
        >
          <PagesTable rows={rows} connected={ga.live} initialShowAll />
        </Card>
      </div>
    </Shell>
  );
}
