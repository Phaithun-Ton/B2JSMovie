import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentBody from "../components/comments/CommentBody";
import CommentProfile from "../components/comments/CommentProfile";
import PostBody from "../components/posts/PostBody";
import PostFooter from "../components/posts/PostFooter";
import PostHeader from "../components/posts/PostHeader";
import PostProfile from "../components/posts/PostProfile";
import PostTagName from "../components/posts/PostTagName";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../config/axios";
import { SelectContext } from "../contexts/SelectContext";
import styles from "../styles/Post.module.css";

function Post() {
  const { user } = useContext(AuthContext);
  const {
    posts,
    setId,
    toggleShowTagNameFrom,
    tagNameShowFrom,
    newTagName,
    setNewTagName,
    setTagNameShowFrom,
    addPostTagName,
    toggleShowTagNameFromToDelete,
    deletePostTagName,
  } = useContext(SelectContext);

  const [tagNames, setTagNames] = useState([]);
  const fectTagNames = async () => {
    try {
      const res = await axios.get("/tag-names");
      //   console.log(res.data);
      setTagNames(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  let { id } = useParams();

  useEffect(() => {
    setId(id);
    fectTagNames();
  }, [id]);

  const payload = {
    tagName: newTagName,
    postId: id,
  };

  const handleSubmitTagName = (e) => {
    e.preventDefault();
    // setTagNameShowFrom(true);
    // addPostTagName(payload);
    deletePostTagName(payload);
    setTagNameShowFrom(true);
  };

  return (
    <>
      {posts && posts.length !== 0 && (
        <>
          <div className="container col-lg-10 my-5">
            <div className="row d-flex justify-content-between">
              <div className={`container ${styles.tagName}`}>
                <div className="p-2 d-flex justify-content-between ">
                  {tagNameShowFrom ? (
                    <PostTagName />
                  ) : (
                    <div className="container">
                      <form
                        className="d-flex justify-content-between"
                        action="action"
                        onSubmit={handleSubmitTagName}
                      >
                        <p className="m-2 ">Tag Name:</p>
                        {tagNames &&
                          tagNames.length !== 0 &&
                          tagNames.tagNames.map((item) => (
                            <div key={item.id}>
                              <input
                                type="checkbox"
                                id={item.title}
                                value={item.id}
                                onChange={(e) => setNewTagName(e.target.value)}
                              />
                              <label htmlFor={item.title} className="m-2">
                                {item.title}
                              </label>
                            </div>
                          ))}
                        <div className="mt-1 text-muted">
                          <div className="dropdown">
                            <button
                              className="btn text-muted"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fa fa-ellipsis-h"></i>
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  disabled={!(posts.userId === user.id)}
                                  onClick={toggleShowTagNameFrom}
                                  className="dropdown-item"
                                  href="/"
                                >
                                  {tagNameShowFrom ? <>Add</> : <>Save</>}
                                </button>
                              </li>
                              <li>
                                <button
                                  disabled={!(posts.userId === user.id)}
                                  className="dropdown-item"
                                  href="/"
                                  onClick={toggleShowTagNameFromToDelete}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  {tagNameShowFrom && (
                    <div className="mt-1 text-muted">
                      <div className="dropdown">
                        <button
                          className="btn text-muted"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fa fa-ellipsis-h"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              disabled={!(posts.userId === user.id)}
                              onClick={toggleShowTagNameFrom}
                              className="dropdown-item"
                              href="/"
                            >
                              {tagNameShowFrom ? <>Add</> : <>Save</>}
                            </button>
                          </li>
                          <li>
                            <button
                              disabled={!(posts.userId === user.id)}
                              className="dropdown-item"
                              href="/"
                              onClick={toggleShowTagNameFromToDelete}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
