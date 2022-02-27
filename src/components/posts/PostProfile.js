import timeSince from "../../services/timeSince";
import defaultImg from "../../assets/image/d-p.png";
import styles from "../../styles/Post.module.css";
import { useContext } from "react";
import { SelectContext } from "../../contexts/SelectContext";
import { AuthContext } from "../../contexts/AuthContext";

function PostProfile({ posts }) {
  const {
    id,
    Likes,
    userId,
    User: { follow },
  } = posts;
  const { likePost, unlikePost, unFollow, followSomeone } =
    useContext(SelectContext);
  const { user } = useContext(AuthContext);

  // TODO: Like post
  const handleSubmitLike = (e) => {
    e.preventDefault();
    likePost(id);
  };

  // TODO: Unlike post
  const handleSubmitUnlike = (e) => {
    e.preventDefault();
    unlikePost(id);
  };

  // TODO: UnFollow user
  const handleSubmitUnFollow = (e) => {
    const payload = {
      userId,
      id,
    };
    e.preventDefault();
    unFollow(payload);
  };

  // TODO: Follow user
  const handleSubmitFollow = (e) => {
    const payload = {
      userId,
      id,
    };
    e.preventDefault();
    followSomeone(payload);
  };

  // TODO: Check like
  const like = Likes.map((item) => item.userId);
  const findLike = like.filter((e) => e === user.id);

  // TODO: Check follow
  const fol = follow.map((item) => item.followerId);
  const findFollower = fol.filter((e) => e === user.id);

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
          <div className="d-flex flex-column ms-2 mt-4 align-items-start ">
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
        {userId !== user.id && (
          <>
            {findLike.length > 0 ? (
              <form onSubmit={handleSubmitUnlike}>
                <button className="ms-2 mt-2">
                  <i className="fas fa-thumbs-up"></i>
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmitLike}>
                <button className="ms-2 mt-2">
                  <i className="far fa-thumbs-up"></i>
                </button>
              </form>
            )}
            {findFollower.length > 0 ? (
              <form onSubmit={handleSubmitUnFollow}>
                <button className="ms-2 mt-2">UnFollow</button>
              </form>
            ) : (
              <form onSubmit={handleSubmitFollow}>
                <button className="ms-2 mt-2">Follow</button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default PostProfile;
