import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <NavLink to={"/categories"}>Categories</NavLink>
    </div>
  );
};

export default Navbar;
