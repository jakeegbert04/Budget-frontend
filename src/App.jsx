import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./components/routing/PrivateRoute";
import Categories from "./components/pages/Categories";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
