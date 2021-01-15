import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTimeago from "react-timeago";
import "./Chat.css";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase";

function Chat({ id, username, timestamp, imageUrl, read, profilePic }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const openPost = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).update({
        read: true,
      });
      console.log(id);
      history.push("/chats/view");
    }
  };

  return (
    <div onClick={openPost} className="chat">
      <Avatar src={profilePic} className="chat__avatar" />
      <div className="chat__info">
        <h4> {username} </h4>
        <p>
          Tap to view -{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />{" "}
        </p>
      </div>
      {/* {!read && <StopRounded className="chat__read" />} */}
    </div>
  );
}

export default Chat;
