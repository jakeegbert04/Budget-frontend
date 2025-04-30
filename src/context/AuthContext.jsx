import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { loading, fetchData } = useFetch();

  const sessionUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const sessionIsAuthenticated =
    sessionStorage.getItem("isAuthenticated") === "true";

  const [userInfo, setUserInfo] = useState(sessionUserInfo || null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionIsAuthenticated || false
  );

  function handleSetUser(data) {
    setUserInfo(data);
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  }

  const login = async (loginForm, event) => {
    event.preventDefault();
    fetchData("user/auth", {
      method: "POST",
      body: loginForm,
    }).then((data) => {
      const user = data.results.user_info;
      setUserInfo(user);
      setIsAuthenticated(true);
      console.log("navigating to home");
      navigate("/home");
    });
  };

  useEffect(() => {
    const checkSession = () => {
      fetchData("validate-session", {
        method: "GET",
      })
        .then((data) => {
          console.log("data", data);
          if (data.message == "Session Valid" && data.results) {
            console.log("hey there");
            setIsAuthenticated(true);
            setUserInfo(data.user_info);
          } else {
            setIsAuthenticated(false);
            sessionStorage.removeItem("userInfo");
            navigate("/login");
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          sessionStorage.setItem("isAuthenticated", "false");
          sessionStorage.removeItem("userInfo");
          navigate("/login");
        });
    };

    checkSession();
  }, [navigate, fetchData]);

  useEffect(() => {
    if (userInfo) {
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

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
