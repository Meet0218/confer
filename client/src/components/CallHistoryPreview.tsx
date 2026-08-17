import Button from "./ui/Button";

interface CallHistoryPreviewProps {
  onViewAll: () => void;
  onStartCall: () => void;
}

export default function CallHistoryPreview({
  onViewAll,
  onStartCall,
}: CallHistoryPreviewProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Call history
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Recent calls, summaries, and follow-ups will appear here.
          </p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onViewAll}>
          View all
        </Button>
      </div>

      <div className="flex min-h-64 flex-col items-center justify-center px-5 py-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-gray-800 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M12 8v5l3 2" />
            <path d="M3.05 11a9 9 0 1 1 .5 4" />
            <path d="M3 15H1v-5" />
          </svg>
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
          No completed calls yet
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-gray-400">
          Start your first call to generate activity, transcripts, and
          AI-assisted summaries.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onStartCall}
          className="mt-5"
        >
          Start a call
        </Button>
      </div>
    </section>
  );
}
