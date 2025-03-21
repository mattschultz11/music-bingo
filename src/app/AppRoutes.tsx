import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";

import { SessionContext } from "../context/SessionContext";
import { Auth } from "../pages/Auth";
import { AuthCallback } from "../pages/AuthCallback";
import { Bingo } from "../pages/Bingo";
import { Playlist } from "../pages/Playlist";

function AppRoutes() {
  const { isAuthenticated } = useContext(SessionContext);

  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/callback/:providerId" element={<AuthCallback />} />
      {isAuthenticated ? (
        <>
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/bingo" element={<Bingo />} />
          <Route path="*" element={<Navigate to="/playlist" replace />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export { AppRoutes };
