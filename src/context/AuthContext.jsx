import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const { data, error, loading, fetchData } = useFetch();
  const { navigate } = useNavigate();

  function handleSetUser(data) {
    setUser(data);
  }

  const login = async (loginForm) => {
    fetchData("user/auth", {
      method: "POST",
      body: loginForm,
    }).then((data) => {
      setUserInfo(data);
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
