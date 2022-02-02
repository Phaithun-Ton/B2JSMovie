import { Outlet } from "react-router-dom";
import stlyes from "../styles/Auth.module.css";

function PublicLayout() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div className="container col-lg-10" style={{ backgroundColor: "black" }}>
        <div className="align-items-center justify-content-center vh-100 ">
          <div className="d-flex justify-content-between col-md">
            <h1 className={stlyes.h1}>B2JS MOVIE</h1>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-lg-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
