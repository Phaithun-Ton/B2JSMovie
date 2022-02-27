import { useEffect, useState } from "react";
import FeedWrapper from "../components/feeds/FeedWrapper";
import FilterFeed from "../components/feeds/FilterFeed";
import styles from "../styles/Feed.module.css";
import axios from "../config/axios";

function Home() {
  const [tagNames, setTagNames] = useState([]);
  const fetchPost = async () => {
    try {
      const res = await axios.get("/tag-names/postTagNames");
      setTagNames(res.data.tagNames);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="container col-lg-10 my-5">
      <div className="row d-flex justify-content-between pe-3">
        <div className="col-lg-9 col-md-8">
          <FeedWrapper tagNames={tagNames} />
        </div>
        <div className={`col-lg-3 col-md-4 mt-4 ${styles.filter}`}>
          <FilterFeed tagNames={tagNames} />
        </div>
      </div>
    </div>
  );
}

export default Home;
