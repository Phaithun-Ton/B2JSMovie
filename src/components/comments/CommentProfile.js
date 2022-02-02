import defaultImg from "../../assets/image/d-p.png";

function CommentProfile(comments) {
  // console.log(comments);
  const { firstName, lastName, profileImg } = comments.comments.User;
  return (
    <>
      <>
        <div className="align-items-center py-2 px-3">
          <div className="d-flex flex-column align-items-center mt-4 ">
            <img
              src={profileImg ?? defaultImg}
              width="100"
              height="100"
              className="rounded-circle"
              alt="user"
              role="button"
            />
            <div className="d-flex flex-column ms-2 mt-4">
              <span className="fw-bold" style={{ color: "#fff" }} role="button">
                {firstName} {lastName}
              </span>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default CommentProfile;
