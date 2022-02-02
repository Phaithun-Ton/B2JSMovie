import timeSince from "../../services/timeSince";
import defaultImg from "../../assets/image/d-p.png";
import styles from "../../styles/Post.module.css";

function PostProfile({ posts }) {
  // console.log(posts);
  return (
    <>
      <div className="align-items-center py-2 px-3">
        <div className="d-flex flex-column align-items-center mt-4 ">
          <img
            src={posts.User.profileImg ?? defaultImg}
            width="100"
            height="100"
            className="rounded-circle"
            alt="user"
            role="button"
          />
          <div className="d-flex flex-column ms-2 mt-4">
            <span className="fw-bold" style={{ color: "#fff" }} role="button">
              {posts.User.firstName} {posts.User.lastName}
            </span>
            <small
              className={`text-muted fs-7 mt-2 d-flex justify-content-between ${styles.time}`}
            >
              <div className="me-3">create:</div>{" "}
              <div>{timeSince(posts.createdAt)}</div>
            </small>
            <small
              className={`text-muted fs-7 d-flex justify-content-between ${styles.time}`}
            >
              <div className="me-2">update:</div>{" "}
              <div>{timeSince(posts.updatedAt)}</div>
            </small>
            <div className={`text-muted fs-7  ${styles.time}`}>
              comment: {posts.Comments.length}
            </div>
            <div className={`text-muted fs-7  ${styles.time}`}>
              Follower: {posts.User.follow.length}
            </div>
            <div className={`text-muted fs-7  ${styles.time}`}>
              like: {posts.Likes.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostProfile;
