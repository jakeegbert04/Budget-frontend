import { Outlet } from "react-router-dom";

import PublicHeader from "../navigation/PublicHeader";

const PublicRoute = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
};

export default PublicRoute;
