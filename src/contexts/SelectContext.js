import { createContext, useContext, useEffect, useState } from "react";
import { getPost } from "../services/localStorage";
import axios from "../config/axios";
import { PostContext } from "./PostContext";

const SelectContext = createContext();

function SelectContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [selectPost, setSelectPost] = useState([]);
  const [newPost, setNewPost] = useState([]);

  const { updatePost } = useContext(PostContext);

  // useEffect(() => {
  //   // if (getPost()) {
  //   axios
  //     .get(`/posts/${selectPost}`)
  //     .then((res) => {
  //       setPosts(res.data.post);
  //     })
  //     .catch((err) => console.log(err));
  //   // setSelectPost(getPost());
  //   // }
  // }, [selectPost, updatePost]);

  console.log(selectPost);
  const fetchPostById = async () => {
    try {
      const res = await axios.get(`/posts/${selectPost}`);
      setPosts(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, []);

  return (
    <SelectContext.Provider
      value={{ posts, selectPost, setSelectPost, newPost, setNewPost }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export default SelectContextProvider;

export { SelectContext };
