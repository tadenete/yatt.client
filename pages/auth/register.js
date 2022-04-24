import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Login() {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setError(""), setMessage("");
  }, [error, message]);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          confirmPassword: confirmPasswordInputRef.current.value,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        throw data.message;
      }
      setMessage(data.message);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="border shadow p-5 rounded col-sm-8 col-md-6">
      <form className="row g-3" onSubmit={handleRegister}>
        <div className="mb-3">
          <h2>Register</h2>
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">Email</span>
          <input
            ref={emailInputRef}
            className="form-control"
            type="email"
            id="email"
            required
            placeholder="joe@example.com"
          />
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">Password</span>
          <input
            className="form-control"
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">Confirm Password</span>
          <input
            ref={confirmPasswordInputRef}
            className="form-control"
            type="password"
            id="confirmPassword"
            required
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Register</button>
          <Link href={"/auth/login"}>
            <a className="btn btn-link">Login</a>
          </Link>
        </div>
        {error && (
          <div className="row g-3">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}
        {message && (
          <div className="row g-3">
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
