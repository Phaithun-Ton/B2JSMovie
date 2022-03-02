import { useEffect, useState } from "react";
import FeedWrapper from "../components/feeds/FeedWrapper";
import FilterFeed from "../components/feeds/FilterFeed";
import styles from "../styles/Feed.module.css";
import axios from "../config/axios";
import Pagination from "../components/pagination/Pagination";
import Spinner from "../components/utils/Spinner";

function Home() {
  const [tagNames, setTagNames] = useState([]);
  const [pageLimit, setPageLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTagName, setFilterTagName] = useState("");
  const [filterText, setFilterText] = useState("");

  const fetchPost = async () => {
    const title = filterTagName;
    try {
      const res = await axios.get(`/tag-names/postTagNames?title=${title}`);
      setTagNames(res.data.tagNames);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostByText = async () => {
    const text = filterText;
    try {
      const res = await axios.get(`/tag-names/postByText?text=${text}`);
      setTagNames(res.data.tagNames);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(tagNames);

  useEffect(() => {
    fetchPost();
  }, [filterTagName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPostByText();
    }, 1200);
    return () => clearTimeout(timer);
  }, [filterText]);

  const onChangePageLimit = (value) => {
    setPageLimit(value);
  };

  const onChangecurrentPage = (value) => {
    setCurrentPage(value);
  };

  // const post = tagNames.map((item) => item.PostTagNames);
  const result = [];

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="container col-lg-10 my-5">
      <div className="row d-flex justify-content-between pe-3">
        <div className="col-lg-9 col-md-8">
          <FeedWrapper tagNames={tagNames} />
        </div>
        <div
          className={`col-lg-3 col-md-4 mt-4 ${styles.filter}`}
          style={{ height: "100vh" }}
        >
          <FilterFeed
            setFilterTagName={setFilterTagName}
            filterText={filterText}
            setFilterText={setFilterText}
          />
        </div>
      </div>
      <div style={{ color: "#fff" }}>
        <Pagination />
      </div>
    </div>
  );
}

export default Home;
