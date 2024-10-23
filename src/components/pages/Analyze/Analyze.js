import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './Analyze.css';

const Analyze = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null); // Canvas for face detection on the captured image
  const liveCanvasRef = useRef(null); // Canvas for face detection on the live webcam feed

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

  // Capture the image from the webcam
  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    await analyzeFace(imageSrc);
  };

  // Reset the captured image and clear the canvas
  const resetCapture = () => {
    setCapturedImage(null);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  };

  // Analyze the captured image for face detection
  const analyzeFace = async (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      // Mirror the image on the canvas
      context.translate(canvas.width, 0);
      context.scale(-1, 1);

      context.drawImage(img, 0, 0);

      detections.forEach(detection => {
        const box = detection.detection.box;
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.strokeRect(box.x, box.y, box.width, box.height);
      });

      context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    };
  };

  // Perform face detection on the live webcam feed
  const detectFaceOnLiveFeed = async () => {
    const webcamElement = webcamRef.current.video;
    if (webcamElement && !webcamElement.paused) {
      const detections = await faceapi.detectAllFaces(webcamElement).withFaceLandmarks();
      
      const canvas = liveCanvasRef.current;
      const context = canvas.getContext('2d');
      const { videoWidth, videoHeight } = webcamElement;
      
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // Mirror the canvas for the live feed
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
      context.translate(canvas.width, 0);
      context.scale(-1, 1); // Flip horizontally to match the mirrored webcam

      // Draw face detection boxes
      detections.forEach(detection => {
        const box = detection.detection.box;
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.strokeRect(box.x, box.y, box.width, box.height);
      });

      context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    }
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

  // Run face detection on the live feed at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      detectFaceOnLiveFeed();
    }, 100); // Run detection every 100ms
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="analyze-container">
      {isLoading && <p>Loading models...</p>} {/* Loading indicator */}
      <div className="media-container">
        {/* Webcam Feed */}
        {!capturedImage && (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="webcam-feed mirrored"
            />
            {/* Canvas for live face detection */}
            <canvas ref={liveCanvasRef} className="face-canvas"></canvas>
          </>
        )}
        {/* Captured Image */}
        {capturedImage && (
          <>
            <img src={capturedImage} alt="Captured" className="captured-image" />
            {/* Canvas for face detection on the captured image */}
            <canvas ref={canvasRef} className="face-canvas"></canvas>
          </>
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
