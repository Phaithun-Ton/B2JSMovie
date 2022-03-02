import { useEffect, useState } from "react";
import styles from "../../styles/Feed.module.css";
import axios from "../../config/axios";

function FilterFeed({ setFilterTagName, filterText, setFilterText }) {
  const [tagNames, setTagNames] = useState([]);

  const handleClickTag = (e) => {
    const tagName = e.target.value;
    e.preventDefault();
    setFilterTagName(tagName);
  };

  const fetchTagNames = async () => {
    try {
      const res = await axios.get(`/tag-names`);
      setTagNames(res.data.tagNames);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTagNames();
  }, []);
  return (
    <>
      <div className="d-flex py-2 justify-content-between">
        <div>
          <h4 className={styles.filter}>Filter</h4>
        </div>
        <div>
          <button
            onClick={() => {
              setFilterTagName("");
              setFilterText("");
            }}
            className={styles.filter}
            style={{ width: "35px" }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <input
        placeholder="Filter"
        className="form-control-plaintext border mt-2 ps-2"
        style={{ color: "#FFF" }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="mt-4 ">
        <h4>TAG</h4>
        <div className="mt-4">
          {tagNames.map((item) => (
            <button
              value={item.title}
              onClick={handleClickTag}
              className={`d-block w-100 ${styles.buttonTagName}`}
              key={item.id}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default FilterFeed;
