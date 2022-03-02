function Pagination() {
  //   const numPage = Math.ceil(numTransaction / pageLimit);

  //   let list = [];
  //   for (let i = 1; i <= numPage; i++) {
  //     list.push(i);
  //   }
  return (
    <>
      {/* <div className="mt-3 d-flex justify-content-between">
        <div className="d-flex align-items-center mb-3">
          <div>
            <select
              onChange={(e) => {
                onChangecurrentPage(1);
                onChangePageLimit(+e.target.value);
              }}
              type="text"
              value={pageLimit}
              className="form-select form-select-sm"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <span className="text-white-50 mx-2 fs-7">
            Showing {(currentPage - 1) * pageLimit + 1} to{" "}
            {currentPage === numPage ? numTransaction : currentPage * pageLimit}{" "}
            of {numTransaction} transactions
          </span>
        </div>
        <nav>
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a onClick={handleClickPrevious} href="/" className="page-link">
                <span>&laquo;</span>
              </a>
            </li>
            {list.map((el) => (
              <li
                key={el}
                className={`page-item ${currentPage === el ? "active" : ""}`}
              >
                <a
                  href="/"
                  className="page-link"
                  onClick={(e) => handleClickPage(e, el)}
                >
                  <span>{el}</span>
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === numPage ? "disabled" : ""
              }`}
            >
              <a onClick={handleClickNext} href="/" className="page-link">
                <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div> */}
    </>
  );
}

export default Pagination;
