import Cookies from "js-cookie";

import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { loading, fetchData } = useFetch();
  const navigate = useNavigate();

  function handleSetUser(data) {
    setUserInfo(data);
  }

  const login = async (loginForm, event) => {
    event.preventDefault();
    fetchData("user/auth", {
      method: "POST",
      body: loginForm,
      credentials: "include",
    }).then((data) => {
      if (data.message.auth_token) {
        Cookies.set("auth_token", data.message.auth_token.auth_token, {
          expires: 7,
          path: "/",
        });
        setUserInfo(data);
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        console.error("Authentication failed:", data);
        setIsAuthenticated(false);
      }
    });
  };

  useEffect(() => {
    const checkSession = () => {
      const token = Cookies.get("auth_token");

      if (token) {
        console.log("Session is valid: ", token);
        setIsAuthenticated(true);
        // Optionally, fetch user info with the token
        fetchData("/auth/check-login", {
          method: "GET",
          credentials: "include",
        }).then((data) => {
          if (data) {
            setUserInfo(data);
          }
        });
      } else {
        console.log("No valid session, redirecting to login");
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate, fetchData]);

  const userState = {
    userInfo,
    setUserInfo: handleSetUser,
    login,
    loading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
}
