import { useContext } from "react";
import { SelectContext } from "../../contexts/SelectContext";

function PostTagName() {
  const { posts } = useContext(SelectContext);
  return (
    <>
      <div className="d-flex">
        <p className="m-2">Tag Name:</p>
        {posts.PostTagNames.map((item) => (
          <p className="m-2" key={item.tagNameId}>
            {item.TagName.title}
          </p>
        ))}
      </div>
    </>
  );
}

export default PostTagName;
