import TrendChart from "../components/TrendChart";
import { NotLiveBanner, SectionHead, Shell } from "../components/Chrome";
import { BarList, Card, Stat } from "../components/panels";
import { useReport } from "../session";

function secs(n: number): string {
  const m = Math.floor(n / 60);
  const s = Math.round(n % 60);
  return m ? `${m}m ${s}s` : `${s}s`;
}

export default function Audience() {
  const { days, ga, incomplete, collecting } = useReport();
  const t = ga.data.totals;

  return (
    <Shell>
      <SectionHead
        title="Audience"
        lead="Who arrives, how they got here, and what they do once they land."
        days={days}
        basePath="/dashboard/audience"
      />

      {incomplete ? <NotLiveBanner collecting={collecting} /> : null}

      <div className="dash-stats dash-stats-4">
        <Stat
          label="Users"
          value={t.activeUsers}
          previous={ga.data.previousTotals?.activeUsers ?? null}
          unavailable={!ga.live}
        />
        <Stat
          label="New users"
          value={t.newUsers}
          previous={ga.data.previousTotals?.newUsers ?? null}
          hint="First visit in this window"
          unavailable={!ga.live}
        />
        <Stat
          label="Average visit"
          value={secs(t.averageSessionDuration)}
          previous={null}
          hint="Time on the site per session"
          unavailable={!ga.live}
        />
        <Stat
          label="Bounce rate"
          value={`${(t.bounceRate * 100).toFixed(1)}%`}
          previous={null}
          hint="Left without engaging. Lower is better."
          unavailable={!ga.live}
        />
      </div>

      <div className="dash-row">
        <Card title="Users per day" hint={`Last ${days} days`}>
          <TrendChart label="Users" points={ga.data.daily.map((d) => ({ date: d.date, value: d.users }))} />
        </Card>
      </div>

      <div className="dash-row dash-row-3">
        <Card title="How they arrive" hint="Sessions by channel">
          <BarList rows={ga.data.channels} />
        </Card>
        <Card title="Device">
          <BarList rows={ga.data.devices} />
        </Card>
        {/* City, not country. This is one agent working Studio City and the
            valley — "United States, 98%" would be true and useless. */}
        <Card title="Where they are" hint="By city">
          <BarList rows={ga.data.cities} emptyLabel="No cities recorded yet." />
        </Card>
      </div>
    </Shell>
  );
}
