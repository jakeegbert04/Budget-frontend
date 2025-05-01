import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useContext(AuthContext);

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Link to="/landing">Landing page</Link>
      <div className="input-label-wrapper">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
          value={loginForm.email}
        />
      </div>
      <div className="input-label-wrapper">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
          value={loginForm.password}
        />
      </div>
      <button onClick={(e) => login(loginForm, e)} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      {error && <p className="error">Error: {error.message}</p>}
    </div>
  );
};

export default Login;
