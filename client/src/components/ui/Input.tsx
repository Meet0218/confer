import { useId, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const reactId = useId();
  const generatedId = id || reactId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={generatedId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={generatedId}
          className={`block w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500"
              : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}
