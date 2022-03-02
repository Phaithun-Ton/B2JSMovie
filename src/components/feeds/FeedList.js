import FeedCard from "./FeedCard";

function FeedList({ tagNames }) {
  // console.log(tagNames);
  return (
    <>
      {tagNames &&
        tagNames.map((item) => <FeedCard key={item.id} tagName={item} />)}
    </>
  );
}

export default FeedList;
