import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [toggleSides, setToggleSides] = useState(false);

  const { login, loading, error } = useContext(AuthContext);

  return (
    <div className="login-container page-container">
      <div className="login-signup-wrapper">
        <div className={`left-side ${toggleSides ? "blue-background" : ""}`}>
          {!toggleSides ? (
            <div className="login-wrapper">
              <h1>Sign In</h1>
              <div className="input-label-wrapper">
                <input
                  type="email"
                  id="email"
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  value={loginForm.email}
                  placeholder="Email"
                />
                {error && <p className="error">Error: {error.message}</p>}
              </div>
              <div className="input-label-wrapper">
                <input
                  type="password"
                  id="password"
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  value={loginForm.password}
                  placeholder="Password"
                />
                {error && <p className="error">Error: {error.message}</p>}
              </div>
              <a href="">Forgot your Password?</a>
              <button
                className="blue-btn"
                onClick={(e) => login(loginForm, e)}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Sign In"}
              </button>
              {error && <p className="error">Error: {error.message}</p>}
            </div>
          ) : (
            <div className="message-wrapper">
              <h1>Welcome Back</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="blue-btn"
                onClick={() => setToggleSides(false)}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
        <div className={`right-side ${!toggleSides ? "blue-background" : ""}`}>
          {!toggleSides ? (
            <div className="message-wrapper">
              <h2>Don't have an account</h2>
              <p>Enter your personal details and start budgeting today</p>
              <button className="blue-btn" onClick={() => setToggleSides(true)}>
                Sign Up
              </button>
            </div>
          ) : (
            <div className="sign-up-wrapper">
              <h1>Create Account</h1>
              <div className="inputs-wrapper">
                <div className="input-label-wrapper">
                  <input type="text" placeholder="Username" />
                  {error && <p className="error">Error: {error.message}</p>}
                </div>
                <div className="input-label-wrapper">
                  <input type="text" placeholder="First Name" />
                  {error && <p className="error">Error: {error.message}</p>}
                </div>
                <div className="input-label-wrapper">
                  <input type="email" placeholder="Email" />
                  {error && <p className="error">Error: {error.message}</p>}
                </div>
                <div className="input-label-wrapper">
                  <input type="text" placeholder="Last Name" />
                  {error && <p className="error">Error: {error.message}</p>}
                </div>
                <div className="input-label-wrapper last-input">
                  <input type="password" placeholder="Password" />
                  {error && <p className="error">Error: {error.message}</p>}
                </div>
              </div>
              <button className="blue-btn">Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
