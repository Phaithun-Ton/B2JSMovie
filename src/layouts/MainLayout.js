import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Header from "./Header";

function MainLayout() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default MainLayout;
