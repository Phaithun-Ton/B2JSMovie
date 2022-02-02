import FeedContent from "./FeedContent";
import FeedHeader from "./FeedHeader";

function FeedCard({ tagName }) {
  // console.log(tagName);
  return (
    <div className="d-flex row ">
      <div className="my-4">
        <FeedHeader tagName={tagName} />
        {tagName.PostTagNames.map((item) => (
          <FeedContent tagName={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default FeedCard;
