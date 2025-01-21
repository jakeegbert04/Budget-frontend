import { useState } from "react";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <h1>Login</h1>
      <div className="input-label-wrapper">
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" />
      </div>
      <div className="input-label-wrapper">
        <label htmlFor="password">Password: </label>
        <input type="password" />
      </div>
    </div>
  );
};

export default Login;
