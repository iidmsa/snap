import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  Send,
  TextFields,
  Timer,
} from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCameraImage, setCameraImage } from "./features/cameraSlice";
import "./Preview.css";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { selectSelectedImage, selectUser } from "./features/appSlice";

function Preview(props) {
  const cameraImg = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImg) {
      history.replace("/");
    }
  }, [cameraImg, history]);

  const closePreview = () => {
    dispatch(setCameraImage(null));
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImg, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: cameraImg,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <Close onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImg} alt="" className="preview__img" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <Send fontSize="small" className="preview__send" />
      </div>
    </div>
  );
}

export default Preview;
