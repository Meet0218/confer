import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ui/ConfirmModal";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/userSlice";
import { showToast } from "../lib/toast";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSignOut = () => {
    setConfirmOpen(false);
    dispatch(logout());
    showToast("Logged out successfully", "success");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-gray-950 dark:text-white">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            aria-label="Go to home"
          >
            <Logo />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name || "Confer user"}
              </p>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                {user?.email || "Ready to collaborate"}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setConfirmOpen(true)}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <ConfirmModal
        open={confirmOpen}
        title="Sign out"
        message="Are you sure you want to sign out?"
        confirmText="Sign out"
        cancelText="Stay signed in"
        onConfirm={handleSignOut}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
