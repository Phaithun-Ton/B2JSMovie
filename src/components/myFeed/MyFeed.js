import MyFeedBody from "./MyFeedBody";
import styles from "../../styles/MyFeed.module.css";
import MyFeedPostFrom from "./MyFeedPostFrom";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import Spinner from "../utils/Spinner";

function MyFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await axios.get("posts/postByUser");
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const createPost = async (title, content, tagName, img) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    for (const image of img) {
      formData.append("image", image);
    }
    for (const tagNameId of tagName) {
      formData.append("tagNameId", tagNameId);
    }

    try {
      setloading(true);
      await axios.post(`/posts`, formData);
      fetchPost();
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  // console.log(posts);
  return (
    <div className="container col-lg-10 my-5">
      <div className={`row d-flex justify-content-between ${styles.container}`}>
        {loading && <Spinner />}
        <MyFeedPostFrom createPost={createPost} />
        {posts &&
          posts.length !== 0 &&
          posts.map((item) => <MyFeedBody key={item.id} posts={item} />)}
      </div>
    </div>
  );
}
export default MyFeed;
