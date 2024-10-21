import React, { useRef, useState, useEffect } from 'react';
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

  // Ensure that webcam permissions are handled
  useEffect(() => {
    const checkWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Webcam access granted");
      } catch (error) {
        console.error("Error accessing webcam:", error);
        alert("Please allow webcam access to use this feature.");
      }
    };

    checkWebcam();
  }, []);

  return (
    <div className="analyze-container">
      <div className="media-container">
        {/* Webcam Feed */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className={`webcam-feed ${capturedImage ? 'hidden' : ''}`} // Hide when image is captured
        />
        {/* Captured Image */}
        {capturedImage && (
          <img src={capturedImage} alt="Captured" className="captured-image" />
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
