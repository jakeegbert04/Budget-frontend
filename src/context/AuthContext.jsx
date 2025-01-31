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

  const login = async (loginForm, event) => {
    event.preventDefault();
    fetchData("user/auth", {
      method: "POST",
      body: loginForm,
    }).then((data) => {
      setUserInfo(data);
      navigate("/home");
    });
  };

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
