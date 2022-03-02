import axios from "axios";
import { useEffect, useState } from "react";
import CommunityBody from "../components/communitys/CommunityBody";
import styles from "../styles/CommunityRc.module.css";

function CommunityRC() {
  const [communityRc, setCommunityRc] = useState([]);

  const fetchPostByRc = async () => {
    try {
      const res = await axios.get(`/posts/communityRc`);

      setCommunityRc(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostByRc();
  }, []);

  return (
    <div className="container col-lg-10" style={{ height: "100vh" }}>
      <div className={`${styles.h1} my-5`}>
        <h1>TOP 5 POPULAR BLOG</h1>
        <i
          className="fas fa-thumbs-up"
          style={{
            fontSize: "2rem",
            marginLeft: "0.8rem",
            marginTop: "0.5rem",
          }}
        ></i>
      </div>
      {communityRc &&
        communityRc.length > 0 &&
        communityRc.map((item) => (
          <CommunityBody communityRc={item} key={item.postId} />
        ))}
    </div>
  );
}

export default CommunityRC;
