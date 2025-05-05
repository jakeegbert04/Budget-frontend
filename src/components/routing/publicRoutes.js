import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const Landing = lazy(() => import("../pages/Landing"));

export const publicRoutes = [
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/landing",
    element: Landing,
  },
];
