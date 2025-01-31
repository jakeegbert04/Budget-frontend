import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const PrivateRoute = () => {
  const { userInfo } = useContext(AuthContext);
  console.log("PrivateRoute - Current user info:", userInfo);

  const isAuthenticated = userInfo && Object.keys(userInfo).length > 0;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
