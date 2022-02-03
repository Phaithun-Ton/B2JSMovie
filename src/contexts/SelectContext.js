import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios";
// import { PostContext } from "./PostContext";

const SelectContext = createContext();

function SelectContextProvider({ children }) {
  const [id, setId] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectPost, setSelectPost] = useState([]);
  const [newTitlePost, setNewTitlePost] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [showFrom, setShowFrom] = useState(true);
  const [editPost, setEditPost] = useState(false);
  const [editContent, setEditContent] = useState(true);

  // const { updatePost } = useContext(PostContext);

  const fetchPostById = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPosts(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleShowFrom = () => {
    setShowFrom((prev) => !prev);
    setEditPost((prev) => !prev);
    setEditContent((prev) => !prev);
  };

  const updatePost = async (payload) => {
    try {
      console.log(payload);
      const { postId, content } = payload;
      const res = await axios.patch(`/posts/${postId}`, {
        // title,
        content,
        // tagName,
        // chageTagName,
        // image,
      });
      fetchPostById(postId);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPostById();
  }, [id]);

  return (
    <SelectContext.Provider
      value={{
        posts,
        selectPost,
        setSelectPost,
        newPost,
        setNewPost,
        showFrom,
        setShowFrom,
        editPost,
        setEditPost,
        editContent,
        setEditContent,
        toggleShowFrom,
        updatePost,
        id,
        setId,
        newTitlePost,
        setNewTitlePost,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export default SelectContextProvider;

export { SelectContext };
