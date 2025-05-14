import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="navbar-container">
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/categories"}>Categories</NavLink>
      <NavLink to={"/accounts"}>Accounts</NavLink>
      <NavLink to={"/transactions"}>Transactions</NavLink>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
