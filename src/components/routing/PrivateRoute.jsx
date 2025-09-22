import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PrivateHeader from "../navigation/PrivateHeader";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  // if (loading) {
  //   return <div className="loading">Verifying authentication...</div>;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
};

export default PrivateRoute;
