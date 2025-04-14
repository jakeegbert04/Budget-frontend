import { Outlet } from "react-router-dom";
import NavBar from "../navigation/Navbar";

const Layout = () => {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
