import styles from "../../styles/MyFeed.module.css";
import timeSince from "../../services/timeSince";
import { useNavigate } from "react-router-dom";

function CommunityBody({ communityRc }) {
  const {
    Post: { title, createdAt, updatedAt, Comments, id },
    count,
  } = communityRc;

  const Navigate = useNavigate();

  return (
    <div className={`container justify-content-between ${styles.feedbody}`}>
      <div className="d-flex align-items-center" style={{ color: "#fff" }}>
        <button
          className={styles.button}
          value={id}
          onClick={(e) => Navigate(`/post/${e.target.value}`)}
        >
          {title ?? "NO Title"}
        </button>
      </div>
      <div className="d-flex">
        <div className={styles.divR}>
          <div>
            <p>Replies: {Comments.length}</p>
            <p>Likes: {count}</p>
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

export default CommunityBody;
