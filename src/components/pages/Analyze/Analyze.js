import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Analyze.css';

const Analyze = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user"
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image
    setCapturedImage(imageSrc); // Store captured image in state
  };

  const resetCapture = () => {
    setCapturedImage(null); // Reset the captured image
  };

  return (
    <div className="analyze-container">
      <div className="media-container"> {/* Container for webcam and image */}
        {/* Webcam Feed */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className={`webcam-feed ${capturedImage ? 'hidden' : ''}`} // Hide when image is captured
          style={{ transform: 'scale(-1, 1)' }} // Mirror the webcam feed horizontally
        />
        {/* Captured Image */}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured"
            className="captured-image"
            style={{ transform: 'scale(-1, 1)' }} // Mirror the captured image
          />
        )}
      </div>
      <div className="button-container">
        <button className={capturedImage ? "reset-button" : "capture-button"} onClick={capturedImage ? resetCapture : capture}>
          {capturedImage ? "Retake Photo" : "Capture Photo"}
        </button>
      </div>
    </div>
  );
};

export default Analyze;
