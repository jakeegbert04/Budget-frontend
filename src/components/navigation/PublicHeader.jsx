import { NavLink } from "react-router-dom";

const PublicHeader = () => {
  return (
    <div className="navbar-container">
      <NavLink to="/landing">Landing Page</NavLink>
    </div>
  );
};

export default PublicHeader;
