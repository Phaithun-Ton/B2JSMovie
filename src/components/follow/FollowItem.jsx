import defaultImg from "../../assets/image/d-p.png";
import { ALL_FOLLOW, ALL_USER } from "../../config/data";
import styles from "../../styles/Follow.module.css";

function FollowItem({ follow, mode, unFollow, followSomeone }) {
  const { profileImg, firstName, lastName, id } = follow;
  console.log(follow);
  const followLength =
    follow.follow && follow.follow.length > 0 ? follow.follow.length : 0;

  return (
    <div className="col-lg-6">
      <div
        className={`card p-3 align-items-center justify-content-between flex-row ${styles.box}`}
      >
        <div className="d-flex align-items-center">
          <img
            src={profileImg ?? defaultImg}
            width="80"
            height="80"
            className="rounded-3"
            alt="user"
          />
          <div className="d-flex flex-column ms-3">
            <span className="fw-bold">
              {firstName} {lastName}
            </span>
            <span className={`fs-7 text-muted ${styles.span}`}>
              {followLength} Follower
            </span>
          </div>
        </div>
        <div>
          {mode === ALL_FOLLOW && (
            <button
              className="btn "
              style={{ color: "red" }}
              onClick={() => unFollow(id)}
            >
              <i className="fas fa-user-minus fs-6" />
            </button>
          )}
          {mode === ALL_USER && (
            <>
              <button
                className="btn text-success"
                onClick={() => followSomeone(id)}
              >
                <i className="fas fa-user-check fs-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowItem;
