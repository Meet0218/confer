import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import CallHistoryPreview from "../components/CallHistoryPreview";
import FeatureAction from "../components/FeatureAction";
import { useAppSelector } from "../store";

function VideoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="m16 13 5 3V8l-5 3" />
      <rect width="14" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm text-slate-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const displayName = user?.name || user?.email || "there";

  return (
    <AppShell>
      <div className="space-y-8">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-indigo-600 dark:text-indigo-300">
              Workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
              Welcome back, {displayName}
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-gray-400">
              Start a live collaboration room, schedule time with your team, or
              review previous call activity from one place.
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <SummaryMetric label="Calls this week" value="0" />
          <SummaryMetric label="Scheduled calls" value="0" />
          <SummaryMetric label="Saved summaries" value="0" />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <FeatureAction
            title="Start a call"
            description="Open a room for video, shared drawing, and live collaboration."
            icon={<VideoIcon />}
            actionLabel="Start call"
            onAction={() => navigate("/calls/start")}
          />
          <FeatureAction
            title="Schedule a call"
            description="Create a future session and invite participants when scheduling is connected."
            icon={<CalendarIcon />}
            actionLabel="Schedule call"
            variant="secondary"
            onAction={() => navigate("/calls/schedule")}
          />
        </section>

        <CallHistoryPreview
          onViewAll={() => navigate("/calls/history")}
          onStartCall={() => navigate("/calls/start")}
        />
      </div>
    </AppShell>
  );
}
