import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));

const PrivateRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default PrivateRoutes;
