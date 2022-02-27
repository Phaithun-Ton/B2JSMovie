import { useContext, useState } from "react";
import timeSince from "../../services/timeSince";
import styles from "../../styles/Post.module.css";
import axios from "../../config/axios";
import { SelectContext } from "../../contexts/SelectContext";

function CommentBody({ comments }) {
  // console.log(comments);
  const { title, createdAt, updatedAt, id, postId } = comments;
  const [editComments, setEditComments] = useState(false);
  const [showFrom, setShowFrom] = useState(true);
  const [newComments, setNewComments] = useState(title);
  const { deleteComment } = useContext(SelectContext);

  const toggleShowFrom = () => {
    setShowFrom((prev) => !prev);
    setEditComments((prev) => !prev);
  };

  const updateComment = async (title) => {
    try {
      const res = await axios.patch(`/comments/${id}`, {
        title,
        postId: postId,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitFrom = (e) => {
    e.preventDefault();
    updateComment(newComments);
    setShowFrom((prev) => !prev);
    setEditComments((prev) => !prev);
  };

  const hanldeClickDelete = async (e) => {
    deleteComment(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="mt-3 ps-4" style={{ color: "#fff" }}>
          Comment
        </p>
        <div className="dropdown mt-2">
          <button className="btn text-muted" data-bs-toggle="dropdown">
            <i className="fa fa-ellipsis-h"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                onClick={toggleShowFrom}
                className="dropdown-item"
                href="/"
                disabled={!(postId !== id)}
              >
                {showFrom ? <>Edit</> : <>Save</>}
              </button>
            </li>
            <li>
              <button
                disabled={!(postId !== id)}
                className="dropdown-item"
                href="/"
                value={id}
                onClick={hanldeClickDelete}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showFrom && (
        <div className="container">
          <p className={`mt-2 ps-4 text-wrap ${styles.p}`}>{newComments}</p>
          <div className={styles.timeComment}>
            <div className="me-2">create:</div>
            <div>{timeSince(createdAt)}</div>
            <div className="me-2 ms-2">update:</div>
            <div>{timeSince(updatedAt)}</div>
          </div>
        </div>
      )}
      {editComments && (
        <form onSubmit={handleSubmitFrom}>
          <input
            type="text"
            value={newComments}
            className={`form-control-plaintext ${styles.fromComment}`}
            onChange={(e) => setNewComments(e.target.value)}
          />
        </form>
      )}
    </>
  );
}

export default CommentBody;
