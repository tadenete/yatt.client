import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function Login() {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    });
    console.log(result);
    if (result.error) {
      setLoginError(result.error);
    } else {
      router.replace("/");
    }
  };

  return (
    <div className="border shadow p-5 rounded col-sm-8 col-md-6">
      <form className="row g-3" onSubmit={handleLogin}>
        <div className="mb-3">
          <h2>Login</h2>
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">Email</span>
          <input
            className="form-control"
            ref={emailInputRef}
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
        <div className="col-auto">
          <button className="btn btn-primary">Login</button>
          <Link href={"/auth/register"}>
            <a className="btn btn-link">Register</a>
          </Link>
        </div>
        {loginError && (
          <div className="row g-3">
            <div className="alert alert-danger" role="alert">
              {loginError}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
