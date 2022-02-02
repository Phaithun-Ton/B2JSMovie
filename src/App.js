import { Toast } from "bootstrap";
import { useContext, useEffect, useRef } from "react";
import { ErrorContext } from "./contexts/ErrorContext";
import RouteConfig from "./routes/RouteConfig";

function App() {
  const { error } = useContext(ErrorContext);

  const toastEl = useRef();

  useEffect(() => {
    if (error) {
      const toast = new Toast(toastEl.current);
      toast.show();
    }
  }, [error]);
  return (
    <>
      <div className="toast-container position-absolute p-3 top-50 end-0 translate-middle-y ">
        <div
          className="toast align-items-center position-relative text-white bg-danger border-0 "
          ref={toastEl}
        >
          <div className="d-flex">
            <div className="toast-body">{error}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
            ></button>
          </div>
        </div>
      </div>
      <RouteConfig />
    </>
  );
}

export default App;
