import { Modal } from "bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import defaultImg from "../../assets/image/d-p.png";
import { AuthContext } from "../../contexts/AuthContext";
import { TagNameContext } from "../../contexts/PostContext";
import styles from "../../styles/MyFeed.module.css";
import Spinner from "../utils/Spinner";
import axios from "../../config/axios";

function MyFeedPostFrom({ createPost }) {
  const { user, updateUser } = useContext(AuthContext);
  const { tagNames } = useContext(TagNameContext);
  const { profileImg } = user;

  const [model, setModal] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagName, setTagName] = useState([]);
  const [img, setImg] = useState([]);
  const [modalEdit, setModalEdit] = useState(null);
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const imgs = Array.from(img);
  const modalEl = useRef();
  const modalEl2 = useRef();
  const imgInputEl = useRef();
  const imgInputEl2 = useRef();

  const handleClickEdit = () => {
    const modelObj = new Modal(modalEl2.current);
    setModalEdit(modelObj);
    modelObj.show();
  };

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

  // TODO: Update profile
  const handleClickUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profileImg", profileImage);
      formData.append("firstName", newFirstName);
      formData.append("lastName", newLastName);
      const res = await axios.patch(`/users/profile-img`, formData);
      updateUser({
        profileImg: res.data.user.profileImg,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
      });
      modalEdit.hide();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
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
            <div onClick={handleClickEdit} className={styles.button}>
              <button className={styles.button}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* // TODO: Modal edit profile */}
      <div className="modal" ref={modalEl2}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className={`modal-header ${styles.myFeed}`}>
              <h5 className="modal-title">Edit Profile</h5>
              <button
                type="button"
                className={`btn-close ${styles.close}`}
                data-bs-dismiss="modal"
                onClick={() => {
                  setProfileImage(null);
                  setNewFirstName(user.firstName);
                  setNewLastName(user.lastName);
                  imgInputEl2.current.value = null;
                }}
              ></button>
            </div>
            <div className={`modal-body ${styles.myFeed}`}>
              <div className={styles.divI}>
                <input
                  value={newFirstName}
                  style={{ width: "50%", borderRadius: "0.2rem" }}
                  placeholder="First name"
                  className="px-2"
                  onChange={(e) => setNewFirstName(e.target.value)}
                />
                <input
                  value={newLastName}
                  style={{
                    width: "50%",
                    borderRadius: "0.2rem",
                  }}
                  className="px-2"
                  placeholder="Last name"
                  onChange={(e) => setNewLastName(e.target.value)}
                />
              </div>
              <div className="mt-4 mb-5 d-flex justify-content-center">
                <input
                  type="file"
                  className="d-none"
                  ref={imgInputEl2}
                  onChange={(e) => {
                    if (e.target.files[0]) setProfileImage(e.target.files[0]);
                  }}
                />
                <img
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : user.profileImg ?? defaultImg
                  }
                  width="200"
                  height="200"
                  className="rounded-circle"
                  alt="user"
                  role="button"
                  onClick={() => imgInputEl2.current.click()}
                />
              </div>
              <div className="d-grid">
                <button
                  type="button"
                  className={`btn ${styles.submit}`}
                  onClick={handleClickUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // TODO: Modal input */}
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
