import Layout from '../../components/Layout/Layout'
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const { handleResetPassword } = useContext(AuthContext);

  return (
    <Layout title='Forgot Password - ShopMonk'>
        <h1 className="main">ShopMonk</h1>
        <div className="log-in">
          <div id="log_in_form">
            <form
              onSubmit={(e) => {
                handleResetPassword(e, email, answer, newPassword);
              }}
            >
              <h2 className="secondary">Reset Password</h2>
              <hr className="horizontal-line" />
              <p>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="input"
                  name="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="answer" className="label">
                  Answer
                </label>
                <input
                  type="text"
                  id="answer"
                  className="input"
                  name="answer"
                  placeholder="Enter your answer"
                  required
                  autoComplete="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="newPassword" className="label">
                  New Password
                </label>
                <input
                  type="newPassword"
                  id="newPassword"
                  className="input"
                  name="newPassword"
                  placeholder="Enter new Password"
                  required
                  autoComplete="current-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </p>
              <button type="submit" className="button-login-signup">
                Reset
              </button>
            </form>
            {/* <p className="link-to-login-signup">
              Don't have an account?
              <Link to="/signup">Sign Up</Link>
            </p> */}
          </div>
        </div>
      </Layout>
  )
}

export default ForgotPassword