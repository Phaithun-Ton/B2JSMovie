import { useEffect, useState } from "react";
import FollowMenu from "../components/follow/FollowMenu";
import { ALL_FOLLOW, ALL_USER } from "../config/data";
import axios from "../config/axios";
import FollowList from "../components/follow/FollowList";
import styles from "../styles/Follow.module.css";

function Follow() {
  const [mode, setMode] = useState(ALL_FOLLOW);
  const [follow, setFollow] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(true);

  useEffect(() => {
    fetchFollow();
  }, [mode, toggleFetch]);

  const fetchFollow = async () => {
    let res;
    if (mode === ALL_FOLLOW) {
      res = await axios.get(`/follows/user`);
      return setFollow(res.data.users);
    }
    if (mode === ALL_USER) {
      res = await axios.get(`/follows/user/unknown`);
      return setFollow(res.data.users);
    }
  };

  const changeMode = (value) => {
    setMode(value);
  };

  const followSomeone = async (id) => {
    const followId = id;
    await axios.post(`/follows/${followId}`);
    setToggleFetch((prev) => !prev);
  };

  const unFollow = async (id) => {
    const followId = id;
    await axios.delete(`/follows/${followId}`);
    setToggleFetch((prev) => !prev);
  };

  return (
    <>
      <div className={`container col-lg-10 my-5`}>
        <FollowMenu changeMode={changeMode} />
        <input
          className="form-control rounded-pill"
          type="search"
          placeholder="Search"
        />
        <FollowList
          follow={follow}
          mode={mode}
          unFollow={unFollow}
          followSomeone={followSomeone}
        />
      </div>
    </>
  );
}

export default Follow;
