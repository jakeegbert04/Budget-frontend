import { NavLink, useLocation } from "react-router-dom";

import Logo from "../../assets/images/logo.png";

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
        <NavLink>
          <img src={Logo} alt="logo" />
        </NavLink>
      </div>
    </div>
  );
};

export default PublicHeader;
