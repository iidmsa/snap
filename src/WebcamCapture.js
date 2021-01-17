import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";
import "./WebcamCapture.css";
import { Close } from "@material-ui/icons";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture(props) {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const closeWebcamCapture = () => {
    history.push("/chats");
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Close onClick={closeWebcamCapture} className="webcamCapture__close" />
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
        className="webcamCapture__video"
      />

      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebcamCapture;
