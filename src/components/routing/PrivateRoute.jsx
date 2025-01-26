import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const isAuthenticated = user && user.length > 0;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
