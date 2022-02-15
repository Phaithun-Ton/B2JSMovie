import styles from "../../styles/MyFeed.module.css";
import timeSince from "../../services/timeSince";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SelectContext } from "../../contexts/SelectContext";

function MyFeedBody({ posts }) {
  const { title, Comments, Likes, createdAt, updatedAt, id } = posts;
  const { setSelectPost } = useContext(SelectContext);

  const Navigate = useNavigate();

  const handleClick = (e) => {
    setSelectPost(e.target.value);
    Navigate(`/post/${e.target.value}`);
  };
  return (
    <div
      className={`container justify-content-between mt-1 ${styles.feedbody}`}
    >
      <div className="d-flex align-items-center" style={{ color: "#fff" }}>
        <button className={styles.button} value={id} onClick={handleClick}>
          {title ?? "NO Title"}
        </button>
      </div>
      <div className="d-flex">
        <div className={styles.divR}>
          <div>
            <p>Replies: {Comments.length}</p>
            <p>Likes: {Likes.length}</p>
          </div>
        </div>
        <div className={styles.divC}>
          <div>
            <div className="d-flex">
              <p className="me-2">create:</p>
              <p>{timeSince(createdAt)}</p>
            </div>
            <div className="d-flex">
              <p className="me-2">update:</p>
              <p>{timeSince(updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyFeedBody;
