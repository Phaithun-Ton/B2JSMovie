import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Auth.module.css";
import axios from "../../config/axios";
import { ErrorContext } from "../../contexts/ErrorContext";

function RegisterFrom() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [togglepass, setTogglepass] = useState(true);
  const [toggleConpass, setToggleConpass] = useState(true);

  const { setError } = useContext(ErrorContext);

  const navigate = useNavigate();

  const handleToggle = async (e) => {
    setTogglepass((prev) => !prev);
  };
  const hadleToggleCon = async (e) => {
    setToggleConpass((prev) => !prev);
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await axios.post("/users/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <h3 className={styles.h3}>Register</h3>
      <form className={styles["login-form"]} onSubmit={handleSubmitLogin}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className={`form-control-plaintext ps-2 ${styles.input}`}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className={`form-control-plaintext ps-2 ${styles.input}`}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
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
          <div className="mb-3 d-flex align-items-center">
            <input
              type={toggleConpass ? "password" : "text"}
              className={`form-control-plaintext ps-2 ${styles.input}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className={`test-center px-3 mt-2 ${styles["btn-custom-eye"]}`}
              value={toggleConpass}
              onClick={hadleToggleCon}
              type="button"
            >
              {toggleConpass ? (
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
          <div className="text-center pt-3">
            <div className="pt-3 text-center d-flex justify-content-center">
              <div style={{ color: "#fff" }}>
                Already have an account? <span></span>
                <Link className={styles.link} to="/">
                  Log in now
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default RegisterFrom;
