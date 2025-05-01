import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));

export const privateRoutes = [
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/categories",
    element: Categories,
  },
];
