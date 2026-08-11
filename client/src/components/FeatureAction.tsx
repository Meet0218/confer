import type { ReactNode } from "react";
import Button from "./ui/Button";

interface FeatureActionProps {
  title: string;
  description: string;
  icon: ReactNode;
  actionLabel: string;
  onAction: () => void;
  variant?: "primary" | "secondary" | "outline";
}

export default function FeatureAction({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  variant = "primary",
}: FeatureActionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-full flex-col gap-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
            {icon}
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant={variant}
          onClick={onAction}
          className="mt-auto"
          fullWidth
        >
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}
