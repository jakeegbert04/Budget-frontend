import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [switchSides, setSwitchSides] = useState(false);

  const { login, loading, error } = useContext(AuthContext);

  return (
    <div className="login-container">
      <div className="login-signup-wrapper">
        <div className="left-side">
          {/* <div className="login-wrapper"> */}
          <h1>Sign In</h1>
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
          {/* </div> */}
        </div>
        <div className="right-side">
          {/* <div className="message-wrapper"> */}
          <h2>Don't have an account</h2>
          <p>Enter your personal details and start budgeting today</p>
          <button>Sign Up</button>
        </div>
        {/* <div className="sign-up-wrapper">
          <h1>Create Account</h1>
        </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;
