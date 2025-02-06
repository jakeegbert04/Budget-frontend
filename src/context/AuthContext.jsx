import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const { loading, fetchData } = useFetch();
  const navigate = useNavigate();

  function handleSetUser(data) {
    setUserInfo(data);
  }

  const checkLogin = async () => {
    try {
      const res = await fetchData("/validate-session", {
        method: "GET",
        credentials: "include",
      });

      if (res.message === "Session valid") {
        setUserInfo({ user_id: res.user_id });
      } else {
        setUserInfo(null);
        navigate("/login");
      }
    } catch (e) {
      console.info("Error checking session:", e.message);
      setUserInfo(null);
      navigate("/login");
    }
  };

  const login = async (loginForm, event) => {
    event.preventDefault();
    fetchData("user/auth", {
      method: "POST",
      body: loginForm,
      credentials: "include",
    }).then((data) => {
      setUserInfo(data);
      navigate("/home");
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const userState = {
    userInfo,
    setUserInfo: handleSetUser,
    login,
    loading,
  };

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
}
