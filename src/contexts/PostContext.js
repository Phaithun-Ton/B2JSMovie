import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";

const TagNameContext = createContext();

function TagNameContextProvider({ children }) {
  const [tagNames, setTagNames] = useState([]);

  const fetchTagNameAll = async () => {
    try {
      const res = await axios.get("tag-names/postTagNames");
      setTagNames(res.data.tagNames);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTagNameAll();
  }, []);

  return (
    <TagNameContext.Provider value={{ tagNames }}>
      {children}
    </TagNameContext.Provider>
  );
}

export default TagNameContextProvider;

export { TagNameContext };
