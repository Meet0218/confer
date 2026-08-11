import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass";
}

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const baseStyles = "rounded-2xl shadow-xl overflow-hidden";

  const variants = {
    default:
      "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
    glass:
      "bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-8 pt-8 pb-6 ${className}`}>{children}</div>;
};

Card.Body = function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-8 pb-8 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 ${className}`}
    >
      {children}
    </div>
  );
};
