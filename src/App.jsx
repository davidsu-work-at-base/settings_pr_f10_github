import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Mfa from "@/pages/Mfa";
import Home from "@/pages/Home";
import PageNotFound from "@/pages/PageNotFound";

// Sends a signed-out visitor to the login page, keeping where they were headed.
function LoginRedirect() {
  const location = useLocation();
  const next = location.pathname + location.search;
  const to = next && next !== "/" ? `/login?returnTo=${encodeURIComponent(next)}` : "/login";
  return <Navigate to={to} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/mfa" element={<Mfa />} />

          <Route element={<ProtectedRoute unauthenticatedElement={<LoginRedirect />} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}