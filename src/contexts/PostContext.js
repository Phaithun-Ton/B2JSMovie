import { createContext, useState } from "react";
import axios from "../config/axios";

const PostContext = createContext();

function PostContextProvider({ children }) {
  const [showFrom, setShowFrom] = useState(true);
  const [editPost, setEditPost] = useState(false);
  const [editContent, setEditContent] = useState(true);

  const toggleShowFrom = () => {
    setShowFrom((prev) => !prev);
    setEditPost((prev) => !prev);
    setEditContent((prev) => !prev);
  };

  const updatePost = async (payload) => {
    try {
      const { postId, content } = payload;
      const res = await axios.patch(`/posts/${postId}`, {
        // title,
        content,
        // tagName,
        // chageTagName,
        // image,
      });
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <PostContext.Provider
      value={{
        showFrom,
        setShowFrom,
        editPost,
        setEditPost,
        editContent,
        setEditContent,
        updatePost,
        toggleShowFrom,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;

export { PostContext };
