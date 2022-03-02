import axios from "../../config/axios";
import { Modal } from "bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TagNameContext } from "../../contexts/PostContext";
import { SelectContext } from "../../contexts/SelectContext";
import styles from "../../styles/MyFeed.module.css";
import Spinner from "../utils/Spinner";

function PostHeader({ posts }) {
  const { user } = useContext(AuthContext);
  const { tagNames } = useContext(TagNameContext);
  const {
    toggleShowFrom,
    updatePost,
    newTitle,
    setNewTitle,
    newContent,
    setNewContent,
    loading,
    setloading,
    setTagNames,
  } = useContext(SelectContext);

  const { title, content, id } = posts;

  const tagName = posts.PostTagNames.map((item) => item.TagName.title);
  const PostImgs = posts.PostImgs;

  const [model, setModal] = useState(null);
  const [newTagName, setNewTagName] = useState([]);
  const [newImg, setNewImg] = useState([]);
  const [postImage, setPostImage] = useState([]);

  const imgs = Array.from(newImg);
  const modalEl = useRef();
  const imgInputEl = useRef();

  const handleClickButton = () => {
    const modalObj = new Modal(modalEl.current);
    setModal(modalObj);
    setNewTitle(title);
    setNewContent(content);
    modalObj.show();
  };

  const handleDeletePostImage = async (e) => {
    console.log(PostImgs.map((item) => item.imgUrl));
    e.preventDefault();
    try {
      setloading(true);
      let postImageId;
      for (const postImage of e.target) {
        postImageId = postImage.value;
      }
      const res = await axios.delete(`/posts/delete-img/${postImageId}`);
      getImagePostById(id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  // TODO: Get post image by id
  const getImagePostById = async (id) => {
    const postId = id;
    try {
      const res = await axios.get(`/posts/post-image/${postId}`);
      console.log(res.data.postImage);
      setPostImage(res.data.postImage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImagePostById(id);
  }, [id, PostImgs]);

  const payload = {
    title: newTitle,
    content: newContent,
    postId: id,
    tagName: newTagName,
    img: newImg,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(payload);
    model.hide();
    setNewTitle("");
    setNewContent("");
    setNewTagName([]);
    setNewImg([]);
  };

  const handleClickTagName = (e) => {
    if (e.target.checked) {
      setNewTagName((prev) => [...prev, e.target.value]);
    } else {
      const idk = newTagName.findIndex((item) => item === e.target.value);
      const tag = [...newTagName];
      tag.splice(idk, 1);
      setNewTagName(tag);
    }
  };

  console.log(postImage);

  return (
    <>
      {loading && <Spinner />}
      <div className="d-flex justify-content-between py-2 px-3">
        <div
          className="d-flex flex-row align-items-center"
          style={{ color: "#fff" }}
        >
          {posts ? (title ? title : "No Title") : null}
        </div>

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
                  onClick={handleClickButton}
                >
                  Edit
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

          {/* // TODO: Modal */}
          <div className="modal" ref={modalEl}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className={`modal-header ${styles.myFeed}`}>
                  <h5 className="modal-title">Create Post</h5>
                  <button
                    type="button"
                    className={`btn-close ${styles.close}`}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setNewImg([]);
                      setNewTitle("");
                      setNewContent("");
                      setNewTagName([]);
                      imgInputEl.current.value = null;
                    }}
                  ></button>
                </div>
                <div className={`modal-body ${styles.myFeed}`}>
                  <form onSubmit={handleDeletePostImage}>
                    {loading && <Spinner />}
                    {postImage.map((item) => (
                      <div value={item.id} key={item.imgUrl} className="d-flex">
                        <img
                          src={item.imgUrl}
                          className="img-fluid my-3"
                          alt="post-img"
                        />
                        <button
                          value={item.id}
                          className={`${styles.buttonClose} mt-3`}
                        >
                          <i className="fas fa-times-circle"></i>
                        </button>
                      </div>
                    ))}
                  </form>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Tag Name:
                      </label>
                      {tagNames &&
                        tagNames.map((item) => (
                          <span key={item.id}>
                            <input
                              className="ms-3"
                              type="checkbox"
                              id={`checkbox-${item.title}`}
                              value={item.id}
                              onChange={handleClickTagName}
                            />
                            <label htmlFor={`checkbox-${item.title}`}>
                              {item.title}
                            </label>
                          </span>
                        ))}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Title:
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        placeholder="Write something"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-5">
                      <label htmlFor="message-text" className="col-form-label">
                        Content:
                      </label>
                      <textarea
                        className="form-control mb-3"
                        rows="3"
                        placeholder="Write something"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                      />
                      {imgs &&
                        imgs.map((item) => (
                          <img
                            src={URL.createObjectURL(item)}
                            className="img-fluid mb-3"
                            alt="post-img"
                            key={item.name}
                          />
                        ))}
                      <div className="input-group mt-3">
                        <input
                          type="file"
                          className="form-control"
                          ref={imgInputEl}
                          onChange={(e) => {
                            console.log(e);
                            setNewImg([...e.target.files]);
                          }}
                          multiple
                        />
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => {
                            imgInputEl.current.value = null;
                            setNewImg([]);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button className={`btn ${styles.submit}`}>Post</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostHeader;
