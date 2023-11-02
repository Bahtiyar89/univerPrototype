import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getItemFromStorage } from "utils/localStorage";

function PublicRouter() {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  if (getItemFromStorage("access_token")) {
    return <Navigate to={fromPage} replace />;
  }

  return <Outlet />;
}

export default PublicRouter;
