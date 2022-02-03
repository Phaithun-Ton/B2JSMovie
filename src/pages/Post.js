import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentBody from "../components/comments/CommentBody";
import CommentProfile from "../components/comments/CommentProfile";
import PostBody from "../components/posts/PostBody";
import PostFooter from "../components/posts/PostFooter";
import PostHeader from "../components/posts/PostHeader";
import PostProfile from "../components/posts/PostProfile";
import { SelectContext } from "../contexts/SelectContext";
import styles from "../styles/Post.module.css";

function Post() {
  const { posts, newPost, setId } = useContext(SelectContext);
  let { id } = useParams();

  useEffect(() => {
    setId(id);
  }, [id]);

  return (
    <>
      {posts && posts.length !== 0 && (
        <>
          <div className="container col-lg-10 my-5">
            <div className="row d-flex justify-content-between ">
              <div className="container-fluid d-flex gap-4">
                <div className="col-lg-2 col-md-4">
                  <div className={styles.contanier}>
                    <PostProfile posts={posts} />
                  </div>
                </div>
                <div className="col-lg-10 col-md-8 pe-4">
                  <div className={styles.contanier}>
                    <PostHeader posts={posts} />
                    <PostBody posts={posts} />
                  </div>
                </div>
              </div>
              {posts.Comments && posts.Comments.length !== 0 && (
                <>
                  {posts.Comments.map((item) => (
                    <div
                      key={item.userId}
                      className="container-fluid d-flex gap-4"
                    >
                      <>
                        <div className="col-lg-2 col-md-4 mt-4">
                          <div className={styles.contanier}>
                            <CommentProfile comments={item} />
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-8 mt-4 pe-4">
                          <div className={styles.contanier}>
                            <CommentBody comments={item} />
                          </div>
                        </div>
                      </>
                    </div>
                  ))}
                </>
              )}
            </div>
            <PostFooter posts={posts} />
          </div>
        </>
      )}
    </>
  );
}

export default Post;
