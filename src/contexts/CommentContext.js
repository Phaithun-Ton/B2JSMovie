import { createContext, useState } from "react";
import axios from "../config/axios";

const CommentContext = createContext();

function CommentContextProvider({ children }) {
  const [comments, setComments] = useState([]);

  const createComment = async (title, id) => {
    try {
      const res = await axios.post("/comments", { title, postId: id });
      setComments((prev) => [...prev, res.data.comment]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CommentContext.Provider value={(createComment, comments)}>
      {children}
    </CommentContext.Provider>
  );
}

export default CommentContextProvider;

export { CommentContext };
