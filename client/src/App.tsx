import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import StartCall from "./pages/StartCall";
import ScheduleCall from "./pages/ScheduleCall";
import CallHistory from "./pages/CallHistory";
import VideoCallPage from "./pages/VideoCallPage";
import { useAppSelector } from "./store";

function PublicRoute({ isAuthed }: { isAuthed: boolean }) {
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get("redirect");
  const safeRedirect =
    redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/home";

  return isAuthed ? <Navigate to={safeRedirect} replace /> : <Outlet />;
}

function ProtectedRoute({ isAuthed }: { isAuthed: boolean }) {
  const location = useLocation();
  const redirectPath = `${location.pathname}${location.search}${location.hash}`;

  return isAuthed ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(redirectPath)}`}
      replace
    />
  );
}

function App() {
  const user = useAppSelector((s) => s.user.user);
  const isAuthed = !!user;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthed ? "/home" : "/login"} replace />}
        />

        <Route element={<PublicRoute isAuthed={isAuthed} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute isAuthed={isAuthed} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/calls/start" element={<StartCall />} />
          <Route path="/calls/schedule" element={<ScheduleCall />} />
          <Route path="/calls/history" element={<CallHistory />} />
          <Route path="/calls/room/:token" element={<VideoCallPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
