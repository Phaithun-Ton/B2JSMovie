import CommentFrom from "../comments/CommentFrom";

function PostFooter({ posts }) {
  return <CommentFrom posts={posts} />;
}

export default PostFooter;
