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
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setloading] = useState(false);
  const [commentTitle, setCommentTitle] = useState("");

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

  const updatePost = async (payload) => {
    const { postId, content, title, img, tagName } = payload;
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("title", title);
    formData.append("content", content);
    for (const image of img) {
      formData.append("image", image);
    }
    for (const tagNameId of tagName) {
      formData.append("tagNameId", tagNameId);
    }
    try {
      setloading(true);
      console.log(payload);
      const res = await axios.patch(`/posts/update`, formData);
      fetchPostById(postId);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
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
    try {
      setloading(true);
      const res = await axios.delete(`/post-tag-names/${postId}/${tagName}`);
      console.log(res.data);
      fetchPostById(postId);
      setTagNameShowFrom(true);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const createComment = async (payload) => {
    const { postId } = payload;
    try {
      const res = await axios.post(`comments`, payload);
      console.log(res.data);
      fetchPostById(postId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(`comments/${id}`);
      console.log(res.data);
      fetchPostById(id);
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: Like post
  const likePost = async (id) => {
    const postId = id;
    try {
      const res = await axios.post(`likes/${postId}`);
      console.log(res.data);
      fetchPostById(id);
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: Unlike post
  const unlikePost = async (id) => {
    const postId = id;
    try {
      const res = await axios.delete(`likes/${postId}`);
      console.log(res.data);
      fetchPostById(id);
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: UnFollow user
  const unFollow = async (payload) => {
    const { userId, id } = payload;
    try {
      const res = await axios.delete(`follows/${userId}`);
      console.log(res.data);
      fetchPostById(id);
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: Follow user
  const followSomeone = async (payload) => {
    const { userId, id } = payload;
    try {
      const res = await axios.post(`follows/${userId}`);
      console.log(res.data);
      fetchPostById(id);
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
        editTagName,
        setEditTagName,
        newTagName,
        setNewTagName,
        addPostTagName,
        deletePostTagName,
        newTitle,
        setNewTitle,
        newContent,
        setNewContent,
        loading,
        setloading,
        commentTitle,
        setCommentTitle,
        createComment,
        deleteComment,
        likePost,
        unlikePost,
        unFollow,
        followSomeone,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export default SelectContextProvider;

export { SelectContext };
