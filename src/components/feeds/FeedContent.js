import defaultImg from "../../assets/image/d-p.png";
import timeSince from "../../services/timeSince";
import styles from "../../styles/Feed.module.css";
import { useContext } from "react";
import { SelectContext } from "../../contexts/SelectContext";
import { useNavigate } from "react-router-dom";

function FeedContent({ tagName }) {
  const { setSelectPost } = useContext(SelectContext);
  const { firstName, lastName, profileImg } = tagName.Post.User;
  const { title, updatedAt, id } = tagName.Post;

  const hadleClick = (e) => {
    setSelectPost(e.target.value);
    Navigate(`/post/${e.target.value}`);
  };

  const Navigate = useNavigate();
  return (
    <>
      <div
        className={`d-flex justify-content-between py-2 px-3 ${styles.feedContent}`}
      >
        <div className="d-flex flex-row align-items-center">
          <img
            src={profileImg ?? defaultImg}
            width="50"
            height="50"
            className="rounded-circle"
            alt="user"
            role="button"
          />
          <div className="d-flex flex-column ms-2">
            <span className="fw-bold text-facebook" role="button">
              {firstName} {lastName}
            </span>
            <small className={`text-muted fs-7 ${styles.time}`}>
              {timeSince(updatedAt)}
            </small>
          </div>
        </div>
        <button
          to="/post"
          value={id}
          className={`navbar-brand ${styles.button}`}
          onClick={hadleClick}
        >
          {title ?? "No Title"}
        </button>
      </div>
    </>
  );
}

export default FeedContent;
