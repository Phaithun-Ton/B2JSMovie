import FollowItem from "./FollowItem";

function FollowList({ follow, mode, unFollow, followSomeone }) {
  return (
    <div className="row g-3 mt-3" style={{ color: "#fff" }}>
      {follow.map((item) => (
        <FollowItem
          key={item.id}
          follow={item}
          mode={mode}
          unFollow={unFollow}
          followSomeone={followSomeone}
        />
      ))}
    </div>
  );
}

export default FollowList;
