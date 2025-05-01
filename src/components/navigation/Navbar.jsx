import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/categories"}>Categories</NavLink>
    </div>
  );
};

export default Navbar;
