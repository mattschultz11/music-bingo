import { Spinner } from "@radix-ui/themes";
import { Option } from "effect";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";

import { AuthContext } from "../context/AuthContext";
import { Auth } from "../pages/Auth";
import { Bingo } from "../pages/Bingo";
import { Playlist } from "../pages/Playlist";

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Spinner loading={Option.isNone(isAuthenticated)} size="3">
      {Option.getOrElse(isAuthenticated, () => false) ? (
        <AuthenticatedRoutes />
      ) : (
        <UnauthenticatedRoutes />
      )}
    </Spinner>
  );
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/playlist" replace />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/bingo" element={<Bingo />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export { AppRoutes };
