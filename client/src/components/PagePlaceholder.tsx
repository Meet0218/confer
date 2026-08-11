import { useNavigate } from "react-router-dom";
import AppShell from "./AppShell";
import Button from "./ui/Button";

interface PagePlaceholderProps {
  title: string;
  message: string;
}

export default function PagePlaceholder({
  title,
  message,
}: PagePlaceholderProps) {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex min-h-[60vh] items-center justify-center">
        <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-400">
            {message}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/home")}
            className="mt-6"
          >
            Back to home
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
