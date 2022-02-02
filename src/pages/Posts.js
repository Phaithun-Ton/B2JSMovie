import { Outlet } from "react-router-dom";

function Posts() {
  return (
    <>
      <div className="container col-lg-10 my-5">
        <div className="row d-flex justify-content-between ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Posts;
