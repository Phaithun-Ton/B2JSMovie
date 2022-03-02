import styles from "../../styles/Follow.module.css";
import { ALL_FOLLOW, ALL_USER } from "../../config/data";
import { useState } from "react";

function FollowMenu({ changeMode }) {
  const [click, setClick] = useState(true);
  return (
    <div className={`d-flex align-items-center mb-4 ${styles.nav}`}>
      <h4 className="m-4">Follow</h4>
      <input
        className="form-control rounded-pill"
        style={{ width: "60%" }}
        type="search"
        placeholder="Search"
      />
      <ul className="nav flex-grow-1 justify-content-end align-items-center">
        <li>
          <button
            onClick={() => {
              changeMode(ALL_FOLLOW);
              setClick((prev) => !prev);
            }}
            className={click ? `${styles.click}` : `${styles.box}`}
          >
            All Follow
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              changeMode(ALL_USER);
              setClick((prev) => !prev);
            }}
            className={click ? `${styles.box} me-4` : `${styles.click} me-4`}
          >
            Find User
          </button>
        </li>
      </ul>
    </div>
  );
}

export default FollowMenu;
