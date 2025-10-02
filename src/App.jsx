import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { publicRoutes } from "./components/routing/publicRoutes";
import { privateRoutes } from "./components/routing/privateRoutes";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";

import InfoProvider from "./context/InfoContext";
import "../styles/main.scss";

function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<PublicRoute />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>

          <Route
            element={
              <InfoProvider>
                <PrivateRoute />
              </InfoProvider>
            }
          >
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
