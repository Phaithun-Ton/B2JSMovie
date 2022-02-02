import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import styles from "../../styles/Auth.module.css";

function LoginFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglepass, setTogglepass] = useState(true);
  const { login } = useContext(AuthContext);

  const { setError } = useContext(ErrorContext);
  const handleToggle = async (e) => {
    setTogglepass((prev) => !prev);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className={styles.h3}>log in</h3>
      <form className={styles["login-form"]} onSubmit={handleSubmitLogin}>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control-plaintext ps-2 ${styles.input}`}
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="mb-3 d-flex align-items-center">
            <input
              type={togglepass ? "password" : "text"}
              className={`form-control-plaintext ps-2 ${styles.input}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`test-center px-3 mt-2 ${styles["btn-custom-eye"]}`}
              value={togglepass}
              onClick={handleToggle}
              type="button"
            >
              {togglepass ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          <button
            className={`btn ${styles["btn-custom"]} btn-lg btn-block mt-4`}
            type="submit"
          >
            Login
          </button>
          <div className="text-center pt-3 ">
            <div className="pt-3 text-center d-flex justify-content-center">
              <div style={{ color: "#fff" }}>
                Don't have an account? <span></span>
                <Link className={styles.link} to="/register">
                  Register now
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginFrom;
