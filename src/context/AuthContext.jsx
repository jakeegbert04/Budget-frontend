import { useState, createContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { loading, fetchData } = useFetch();
  const location = useLocation();

  // Initialize state from sessionStorage with proper type checking
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

  // Check authentication status on mount and route changes
  const checkSession = useCallback(async () => {
    // Don't check session on login page to avoid redirect loops
    if (location.pathname === "/login") {
      return;
    }

    try {
      const data = await fetchData("validate-session", {
        method: "GET",
      });

      if (data && data.message === "Session Valid" && data.results) {
        setIsAuthenticated(true);
        // Make sure we're accessing the user_info property correctly
        if (data.user_info) {
          setUserInfo(data.user_info);
        }
      } else {
        // Clear auth state
        handleLogout();
      }
    } catch (error) {
      console.error("Session validation failed:", error);
      // Clear auth state on error
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
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (e.g., show error message)
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Check session on initial load and when location changes
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Export auth state and methods
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
