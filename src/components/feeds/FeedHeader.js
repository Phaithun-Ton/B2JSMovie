import styles from "../../styles/Feed.module.css";

function FeedHeader({ tagName }) {
  return (
    <div className={`text-justify px-3 py-2 ${styles.tagName}`}>
      Tag: {tagName.title}
    </div>
  );
}

export default FeedHeader;
