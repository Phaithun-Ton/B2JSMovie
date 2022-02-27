import { useContext } from "react";
import defaultImg from "../../assets/image/d-p.png";
import { SelectContext } from "../../contexts/SelectContext";

function CommentFrom({ posts }) {
  const { id } = posts;
  const { commentTitle, setCommentTitle, createComment } =
    useContext(SelectContext);

  const payload = {
    title: commentTitle,
    postId: id,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(payload);
    setCommentTitle("");
  };

  return (
    <form className="mt-5 px-4" onSubmit={handleSubmit}>
      <div className="position-relative d-flex align-items-center">
        <img
          src={defaultImg}
          width="30"
          height="30"
          className="rounded-circle me-2"
          alt="user"
        />
        <input
          type="text"
          className="form-control rounded-pill d-inline "
          placeholder="Write something ..."
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
      </div>
    </form>
  );
}

export default CommentFrom;
