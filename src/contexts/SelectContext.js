import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";

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
  const [tagNameShowFrom, setTagNameShowFrom] = useState(true);
  const [editTagName, setEditTagName] = useState([]);
  const [newTagName, setNewTagName] = useState([]);

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
    setNewPost(posts && posts.content);
    setNewTitlePost(posts && posts.title);
    setEditPost((prev) => !prev);
    setEditContent(false);
  };

  const toggleShowTagNameFrom = () => {
    setTagNameShowFrom(false);
    setEditTagName(posts && posts.postTagNames.TagName);
  };

  const toggleShowTagNameFromToDelete = () => {
    setTagNameShowFrom(false);
    setEditTagName(posts && posts.postTagNames.TagName);
  };

  const checkedTagName =
    posts &&
    posts.length !== 0 &&
    posts.PostTagNames.map((item) => item.TagName && item.TagName.title);

  const updatePost = async (payload) => {
    try {
      console.log(payload);
      const { postId, content, title } = payload;
      const res = await axios.patch(`/posts/${postId}`, {
        title,
        content,
        // tagName,
        // chageTagName,
        // image,
      });
      fetchPostById(postId);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostTagName = async (payload) => {
    const { postId, tagName } = payload;
    console.log(postId);
    console.log(tagName);
    try {
      const res = await axios.post(`/post-tag-names/${postId}/${tagName}`);
      console.log(res.data);
      fetchPostById(postId);
      setTagNameShowFrom(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePostTagName = async (payload) => {
    const { postId, tagName } = payload;
    console.log(postId);
    console.log(tagName);
    try {
      const res = await axios.delete(`/post-tag-names/${postId}/${tagName}`);
      console.log(res.data);
      fetchPostById(postId);
      setTagNameShowFrom(true);
    } catch (err) {
      console.log(err);
    }
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
        tagNameShowFrom,
        setTagNameShowFrom,
        toggleShowTagNameFrom,
        editTagName,
        setEditTagName,
        newTagName,
        setNewTagName,
        addPostTagName,
        toggleShowTagNameFromToDelete,
        deletePostTagName,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export default SelectContextProvider;

export { SelectContext };
