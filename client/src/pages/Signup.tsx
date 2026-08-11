import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useAppDispatch } from "../store";
import { setCredentials } from "../store/userSlice";
import { signupUser } from "../lib/api";
import { showToast } from "../lib/toast";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      const { user } = data;
      dispatch(setCredentials({ user }));
      showToast("Sign up successful", "success");
      navigate("/home", { replace: true });
    },
    onError: (err: Error) => {
      showToast(err.message || "Sign up failed", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const name = fd.get("name")?.toString().trim() || "";
    const email = fd.get("email")?.toString().trim() || "";
    const password = fd.get("password")?.toString().trim() || "";
    if (!email || !password || !name) return;

    signupMutation.mutate({ name, email, password });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <Card
          variant="glass"
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <Card.Header>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Create an account
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Join us and start your journey
            </p>
          </Card.Header>

          <Card.Body>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                required
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              <Input
                name="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                required
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              />

              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                required
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              <Button
                type="submit"
                fullWidth
                className="mt-4"
                isLoading={signupMutation.isPending}
              >
                Create Account
              </Button>
            </form>
          </Card.Body>

          <Card.Footer>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
