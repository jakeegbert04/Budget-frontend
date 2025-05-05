import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/categories"}>Categories</NavLink>
      <NavLink to={"/accounts"}>Accounts</NavLink>
      <NavLink to={"/transactions"}>Transactions</NavLink>
      <button>Logout</button>
    </div>
  );
};

export default Navbar;
