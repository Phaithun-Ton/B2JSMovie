import { Modal } from "bootstrap";
import { useContext, useRef, useState } from "react";
import defaultImg from "../../assets/image/d-p.png";
import { AuthContext } from "../../contexts/AuthContext";
import { TagNameContext } from "../../contexts/PostContext";
import styles from "../../styles/MyFeed.module.css";

function MyFeedPostFrom({ createPost }) {
  const { user } = useContext(AuthContext);
  const { tagNames } = useContext(TagNameContext);
  const { profileImg } = user;

  const [model, setModal] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagName, setTagName] = useState([]);
  const [img, setImg] = useState([]);

  console.log(img);
  const imgs = Array.from(img);
  const modalEl = useRef();
  const imgInputEl = useRef();

  const handleClickInput = () => {
    const modalObj = new Modal(modalEl.current);
    setModal(modalObj);
    modalObj.show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(title, content, tagName, img);
    model.hide();
    setTitle("");
    setContent("");
    setTagName([]);
    setImg([]);
  };

  const handleClickTagName = (e) => {
    if (e.target.checked) {
      setTagName((prev) => [...prev, e.target.value]);
    } else {
      const idk = tagName.findIndex((item) => item === e.target.value);
      const tag = [...tagName];
      tag.splice(idk, 1);
      setTagName(tag);
    }
  };

  return (
    <>
      <div className={`mb-3 p-3 ${styles.postFrom}`}>
        <div className="position-relative d-flex align-items-center">
          <img
            src={profileImg ?? defaultImg}
            width="50"
            height="50"
            className="rounded-circle me-2"
            alt="user"
          />
          <input
            type="text"
            className={`form-control rounded-pill d-inline ${styles.input}`}
            placeholder="What's on your mind?"
            onClick={handleClickInput}
          />
          <div
            className="position-absolute"
            style={{
              top: "50%",
              right: 13,
              transform: "translateY(-50%)",
            }}
          >
            <i className="fas fa-edit" style={{ color: "#fff" }}></i>
          </div>
        </div>
      </div>
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
                  setImg([]);
                  setTitle("");
                  setContent("");
                  setTagName([]);
                  imgInputEl.current.value = null;
                }}
              ></button>
            </div>
            <div className={`modal-body ${styles.myFeed}`}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Tag Name:
                  </label>
                  {tagNames &&
                    tagNames.map((item) => (
                      <span key={item.id}>
                        <input
                          className="ms-3"
                          type="checkbox"
                          id={`checkbox-${item.title}`}
                          value={item.title}
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                        setImg([...e.target.files]);
                      }}
                      multiple
                    />
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => {
                        imgInputEl.current.value = null;
                        setImg([]);
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
    </>
  );
}

export default MyFeedPostFrom;
