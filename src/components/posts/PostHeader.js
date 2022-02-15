import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SelectContext } from "../../contexts/SelectContext";
import styles from "../../styles/Post.module.css";

function PostHeader({ posts }) {
  const { user } = useContext(AuthContext);
  const {
    toggleShowFrom,
    showFrom,
    setEditContent,
    newTitlePost,
    setNewTitlePost,
    updatePost,
    setEditPost,
    setShowFrom,
  } = useContext(SelectContext);

  const { title, id } = posts;

  const payload = {
    title: newTitlePost,
    postId: id,
  };

  const handleSubmitTitleFrom = (e) => {
    e.preventDefault();
    updatePost(payload);
    setEditContent(false);
    setShowFrom(true);
    setEditPost(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between py-2 px-3">
        {showFrom ? (
          <div
            className="d-flex flex-row align-items-center"
            style={{ color: "#fff" }}
          >
            {posts ? (title ? title : "No Title") : null}
          </div>
        ) : (
          <form onSubmit={handleSubmitTitleFrom}>
            <input
              type="text"
              value={newTitlePost}
              className={`form-control-plaintext ${styles.postInput}`}
              onChange={(e) => setNewTitlePost(e.target.value)}
            />
          </form>
        )}
        <div className="mt-1 text-muted">
          <div className="dropdown">
            <button className="btn text-muted" data-bs-toggle="dropdown">
              <i className="fa fa-ellipsis-h"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  disabled={!(posts.userId === user.id)}
                  onClick={toggleShowFrom}
                  className="dropdown-item"
                  href="/"
                >
                  {showFrom ? <>Edit</> : <>Save</>}
                </button>
              </li>
              <li>
                <button
                  disabled={!(posts.userId === user.id)}
                  className="dropdown-item"
                  href="/"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostHeader;
