import styles from "../../styles/Post.module.css";

function PostBody({ posts }) {
  const { PostImgs, content } = posts;
  const contents = content.split("\r\n");

  return (
    <>
      <>
        <div
          className="container align-items-center ms-4"
          style={{ color: "#fff" }}
        >
          {contents &&
            contents.map((item) => (
              <p key={item} className={`me-5 text-wrap ${styles.p}`}>
                {item}
              </p>
            ))}
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
    </>
  );
}

export default PostBody;
