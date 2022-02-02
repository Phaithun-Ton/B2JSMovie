import styles from "../../styles/Feed.module.css";

function FilterFeed({ tagNames }) {
  // console.log(tagNames);

  return (
    <>
      <div className="d-flex py-2 justify-content-between">
        <div>
          <h4 className={styles.filter}>Filter</h4>
        </div>
        <div>
          <button className={styles.filter} style={{ width: "35px" }}>
            <i className="fas fa-redo-alt"></i>
          </button>
          <button className={styles.filter} style={{ width: "35px" }}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <input
        placeholder="Filter"
        className="form-control-plaintext border mt-2 ps-2"
        style={{ color: "#FFF" }}
      />
      <div className="mt-4 ">
        <h4>TAG</h4>
        <div className="d-inline-blonk mt-4">
          {tagNames.map((item) => (
            <button className="me-1" key={item.id}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default FilterFeed;
