import { Avatar } from "@material-ui/core";
import { ChatBubble, RadioButtonUnchecked, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from "./Chat";
import "./Chats.css";
import { selectUser } from "./features/appSlice";
import { resetCameraImage } from "./features/cameraSlice";
import { auth, db } from "./firebase";

function Chats(props) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();

  const takeSnap = () => {
    dispatch(resetCameraImage);
    history.push("/");
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <Search className="chat__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { username, timestamp, imageUrl, read, profilePic },
          }) => (
            <Chat
              key={id}
              imageUrl={imageUrl}
              username={username}
              timestamp={timestamp}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
