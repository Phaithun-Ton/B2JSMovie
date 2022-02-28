import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import stlyes from "../styles/Auth.module.css";
import stlyesNav from "../styles/Nav.module.css";
import defaultImg from "../assets/image/d-p.png";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { setLanguage } = useContext(LanguageContext);
  const { logout, user } = useContext(AuthContext);

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <div
          className="container col-lg-10"
          style={{ backgroundColor: "black" }}
        >
          <div className="align-items-center justify-content-center">
            <div className="d-flex col-lg  justify-content-between">
              <div>
                <h1 className={stlyes.h1}>B2JS MOVIE</h1>
              </div>
              <div className="d-flex col-md-2 justify-content-end">
                <select
                  onChange={(e) => setLanguage(e.target.value)}
                  className={stlyes.select}
                >
                  <option value="EN">EN</option>
                  <option value="TH">TH</option>
                </select>
                <button className={stlyes.logout} onClick={() => logout()}>
                  Log out
                </button>
              </div>
            </div>
            <nav
              className={`navbar navbar-expand-sm sticky-top ${stlyesNav.nav}`}
            >
              <div className="container-fluid">
                <div className="navbar-collapse col-md-10">
                  <ul className="navbar-nav">
                    <li className="nav-item mx-3">
                      <Link to="/" className={`navbar-brand ${stlyesNav.link}`}>
                        <i className="fas fa-home"></i> Home
                      </Link>
                    </li>
                    <li className="nav-item mx-3">
                      <Link
                        to="/my-feed"
                        className={`navbar-brand ${stlyesNav.link}`}
                      >
                        <i className="fas fa-rss-square"></i> My Feed
                      </Link>
                    </li>
                    <li className="nav-item mx-3">
                      <Link
                        to="/follow"
                        className={`navbar-brand ${stlyesNav.link}`}
                      >
                        <i className="fas fa-user"></i> Follow
                      </Link>
                    </li>
                    <li className="nav-item mx-3">
                      <Link to="/" className={`navbar-brand ${stlyesNav.link}`}>
                        <i className="fas fa-thumbs-up"></i> Community
                        Recommendation
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="d-none d-lg-flex pt-2">
                  <div className="navbar-brand" style={{ color: "#fff" }}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="navbar-brand" role="button">
                    <img
                      src={user.profileImg ?? defaultImg}
                      width="40"
                      height="40"
                      className="rounded-circle"
                      alt="user"
                    />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
