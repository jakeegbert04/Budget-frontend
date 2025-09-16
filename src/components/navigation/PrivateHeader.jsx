import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const PrivateHeader = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="navbar-container">
      <div>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/accounts">Accounts</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
      </div>
      <NavLink to="/home">Logo</NavLink>
      <button className="blue-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default PrivateHeader;
