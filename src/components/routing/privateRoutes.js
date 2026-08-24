import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const Accounts = lazy(() => import("../pages/Accounts"));
const Transactions = lazy(() => import("../pages/Transactions"));
const AccountDetails = lazy(() => import("../pages/AccountDetails"));

export const privateRoutes = [
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/categories",
    element: Categories,
  },
  {
    path: "/accounts",
    element: Accounts,
  },
  {
    path: "/transactions",
    element: Transactions,
  },
  {
    path: "/accounts/:accountId",
    element: AccountDetails,
  },
];
