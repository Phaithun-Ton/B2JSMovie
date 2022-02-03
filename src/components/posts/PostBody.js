import { useContext } from "react";
import { SelectContext } from "../../contexts/SelectContext";
import styles from "../../styles/Post.module.css";

function PostBody({ posts }) {
  const { PostImgs, content, id } = posts;
  const {
    showFrom,
    updatePost,
    editPost,
    editContent,
    setEditContent,
    setNewPost,
    newPost,
  } = useContext(SelectContext);

  const payload = {
    content: newPost,
    postId: id,
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
    updatePost(payload);
    setEditContent((prev) => !prev);
  };

  return (
    <>
      {showFrom && (
        <>
          <div
            className="d-flex align-items-center ms-5"
            style={{ color: "#fff" }}
          >
            {content}
          </div>
          {PostImgs.map((item) => (
            <img
              src={item.imgUrl}
              key={item.imgUrl}
              className="img-fluid px-5 py-4"
              alt="post-img"
            />
          ))}
        </>
      )}
      {editPost && content && (
        <form onSubmit={handleSubmitPost}>
          {editContent ? (
            <div
              className={`d-flex align-items-center ms-5`}
              style={{ color: "#fff" }}
              onClick={() => setEditContent((prev) => !prev)}
            >
              {content}
            </div>
          ) : (
            <input
              type="text"
              value={newPost}
              className={`form-control-plaintext ms-5 ${styles.postInput}`}
              onChange={(e) => setNewPost(e.target.value)}
            />
          )}
          {PostImgs.map((item) => (
            <img
              src={item.imgUrl}
              key={item.imgUrl}
              className="img-fluid px-5 py-4"
              alt="post-img"
            />
          ))}
        </form>
      )}
    </>
  );
}

export default PostBody;
