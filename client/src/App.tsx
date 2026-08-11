import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import StartCall from "./pages/StartCall";
import ScheduleCall from "./pages/ScheduleCall";
import CallHistory from "./pages/CallHistory";
import { useAppSelector } from "./store";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calls/start" element={<StartCall />} />
        <Route path="/calls/schedule" element={<ScheduleCall />} />
        <Route path="/calls/history" element={<CallHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
