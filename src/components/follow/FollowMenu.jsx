import styles from "../../styles/Follow.module.css";
import { ALL_FOLLOW, ALL_USER } from "../../config/data";

function FollowMenu({ changeMode }) {
  return (
    <div className={`d-flex align-items-center mb-4 ${styles.nav}`}>
      <h4 className="m-4">Follow</h4>
      <ul className="nav flex-grow-1 justify-content-end align-items-center">
        <li className="nav-item active">
          <button
            onClick={() => changeMode(ALL_FOLLOW)}
            className={`btn ${styles.buttonNav}`}
          >
            All Follow
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => changeMode(ALL_USER)}
            className={`btn me-4 ${styles.buttonNav}`}
          >
            Find User
          </button>
        </li>
      </ul>
    </div>
  );
}

export default FollowMenu;
