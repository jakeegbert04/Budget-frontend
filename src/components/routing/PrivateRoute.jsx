import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function PrivateRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
