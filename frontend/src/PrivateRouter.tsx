import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getItemFromStorage } from "utils/localStorage";

function PrivateRouter() {
  const location = useLocation();
  if (!getItemFromStorage("access_token")) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default PrivateRouter;
