import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js'; // Import face-api.js
import './Analyze.css';

const Analyze = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user"
  };

  // Load models
  const loadModels = async () => {
    setIsLoading(true);
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    setIsLoading(false);
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image
    console.log('Captured image source:', imageSrc); // Debugging line
    setCapturedImage(imageSrc); // Store captured image in state
    await analyzeFace(imageSrc); // Call the face analysis function
  };

  const resetCapture = () => {
    console.log('Resetting capture'); // Debugging line
    setCapturedImage(null); // Reset the captured image
  };

  const analyzeFace = async (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();
      console.log('Detections:', detections); // Log all detections for debugging
      
      // Create a canvas to draw the detections
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      // Draw the detections
      detections.forEach(detection => {
        if (detection.detection.box && detection.landmarks) { // Check if box and landmarks exist
          const box = detection.detection.box;
          const landmarks = detection.landmarks.positions; // Access landmarks positions
          context.strokeStyle = 'red';
          context.lineWidth = 2;
          context.strokeRect(box.x, box.y, box.width, box.height);
          
          landmarks.forEach(point => {
            context.fillStyle = 'green';
            context.fillRect(point.x, point.y, 5, 5);
          });
        } else {
          console.warn('Detection does not have box or landmarks:', detection); // Log if something is missing
        }
      });

      // Append the canvas to your UI (you can customize where to append)
      document.body.appendChild(canvas);
    };
  };

  useEffect(() => {
    const checkWebcam = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Webcam access granted");
      } catch (error) {
        console.error("Error accessing webcam:", error);
        alert("Please allow webcam access to use this feature.");
      }
    };

    loadModels(); // Load the models
    checkWebcam();
  }, []);

  return (
    <div className="analyze-container">
      {isLoading && <p>Loading models...</p>} {/* Loading indicator */}
      <div className="media-container">
        {/* Webcam Feed */}
        {!capturedImage && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={`webcam-feed mirrored`} // Add mirrored class
          />
        )}
        {/* Captured Image */}
        {capturedImage && (
          <img src={capturedImage} alt="Captured" className={`captured-image mirrored`} /> // Add mirrored class
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
