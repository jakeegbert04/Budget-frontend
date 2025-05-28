import { useState, createContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { publicRoutes } from "../components/routing/publicRoutes";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { loading, fetchData } = useFetch();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUserInfo = sessionStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch (error) {
      console.error("Failed to parse userInfo from sessionStorage:", error);
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("isAuthenticated") === "true";
  });

  const checkSession = useCallback(async () => {
    const publicPaths = publicRoutes.map((route) => route.path);
    if (publicPaths.includes(location.pathname)) {
      return;
    }

    try {
      const data = await fetchData("validate-session", {
        method: "GET",
      });

      if (data && data.message === "Session Valid" && data.results) {
        setIsAuthenticated(true);
        if (data.user_info) {
          setUserInfo(data.user_info);
        }
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Session validation failed:", error);
      handleLogout();
    }
  }, [fetchData, location.pathname, navigate]);

  const handleSetUser = (data) => {
    if (data) {
      setUserInfo(data);
      sessionStorage.setItem("userInfo", JSON.stringify(data));
    }
  };

  const login = async (loginForm, event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const data = await fetchData("user/auth", {
        method: "POST",
        body: loginForm,
      });

      if (data && data.results && data.results.user_info) {
        const user = data.results.user_info;
        setUserInfo(user);
        setIsAuthenticated(true);
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/home");
      } else {
        console.error("Login failed: Invalid response format");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    fetchData("logout", {
      method: "PUT",
    });
    setIsAuthenticated(false);
    setUserInfo(null);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userInfo");
    navigate("/login");
  };

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const userState = {
    userInfo,
    setUserInfo: handleSetUser,
    login,
    logout: handleLogout,
    loading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
}
