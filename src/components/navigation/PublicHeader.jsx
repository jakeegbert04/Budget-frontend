import { NavLink, useLocation } from "react-router-dom";

const PublicHeader = () => {
  const { pathname } = useLocation();
  return (
    <div className="navbar-container">
      <div className="public-container">
        {pathname === "/login" ? (
          <NavLink to="/landing">Landing Page</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        <a href="">Logo</a>
      </div>
    </div>
  );
};

export default PublicHeader;
