import defaultImg from "../../assets/image/d-p.png";

function CommentFrom() {
  return (
    <form className="mt-5 px-4">
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
        />
      </div>
    </form>
  );
}

export default CommentFrom;
