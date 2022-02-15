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
    setShowFrom,
    setEditPost,
  } = useContext(SelectContext);

  const payload = {
    content: newPost,
    postId: id,
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
    updatePost(payload);
    setEditContent(false);
    setShowFrom(true);
    setEditPost(false);
  };

  return (
    <>
      {showFrom && (
        <>
          <div
            className="container align-items-center ms-4"
            style={{ color: "#fff" }}
          >
            <p className={`me-5 text-wrap  ${styles.p}`}>{content}</p>
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
            >
              <p className={styles.p}></p> {content}
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
