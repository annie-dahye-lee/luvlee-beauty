import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./Analyze.css";

const Analyze = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [skinTone, setSkinTone] = useState(null);

  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user",
  };

  useEffect(() => {
    const checkWebcam = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Webcam access granted");
        setIsLoading(false);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        alert("Please allow webcam access to use this feature.");
      }
    };
    checkWebcam();
  }, []);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
        console.log("Models loaded successfully");
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };
    loadModels();
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setSkinTone(null); // Reset skin tone when taking a new picture
  };

  const analyzeSkinTone = (landmarks, img) => {
    // Using the indices for the left and right cheeks
    const leftCheek = landmarks.positions[31]; // Left cheek
    const rightCheek = landmarks.positions[36]; // Right cheek

    // Create a canvas to analyze pixel data
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sample pixels around the cheek landmarks
    const samplePixels = [];
    const sampleSize = 5; // Number of pixels to sample around each landmark

    const sampleCheek = (landmark) => {
      for (let x = -sampleSize; x <= sampleSize; x++) {
        for (let y = -sampleSize; y <= sampleSize; y++) {
          const pixelX = Math.floor(landmark.x) + x;
          const pixelY = Math.floor(landmark.y) + y;
          const index = (pixelY * canvas.width + pixelX) * 4; // Calculate index in the pixel array

          if (pixelX >= 0 && pixelX < canvas.width && pixelY >= 0 && pixelY < canvas.height) {
            const r = data[index];     // Red
            const g = data[index + 1]; // Green
            const b = data[index + 2]; // Blue
            samplePixels.push({ r, g, b });
          }
        }
      }
    };

    sampleCheek(leftCheek);
    sampleCheek(rightCheek);

    // Calculate the average color
    const avgColor = samplePixels.reduce(
      (acc, pixel) => {
        acc.r += pixel.r;
        acc.g += pixel.g;
        acc.b += pixel.b;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );

    const numSamples = samplePixels.length;
    const averageColor = {
      r: Math.round(avgColor.r / numSamples),
      g: Math.round(avgColor.g / numSamples),
      b: Math.round(avgColor.b / numSamples),
    };

    // Determine the undertone based on average cheek color
    const averageIntensity = (averageColor.r + averageColor.g + averageColor.b) / 3;
    if (averageIntensity > 200) {
      setSkinTone("Warm");
    } else if (averageIntensity > 150) {
      setSkinTone("Neutral");
    } else {
      setSkinTone("Cool");
    }
  };

  const handleImage = async () => {
    if (!capturedImage) return;

    // Convert capturedImage (base64) to Image object
    const img = new Image();
    img.src = capturedImage;

    img.onload = async () => {
      try {
        const detections = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        if (detections && detections.landmarks) {
          console.log("Detections:", detections);
          analyzeSkinTone(detections.landmarks, img); // Analyze skin tone based on landmarks
        } else {
          console.log("No face detected.");
        }
      } catch (error) {
        console.error("Error detecting faces:", error);
      }
    };
  };

  // Call handleImage whenever a new capturedImage is set
  useEffect(() => {
    if (capturedImage) handleImage();
  }, [capturedImage]);

  return (
    <div className="analyze-container">
      {isLoading && <p>Loading webcam...</p>}
      <div className="media-container">
        {!capturedImage && !isLoading && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam-feed"
          />
        )}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured"
            className="captured-image"
          />
        )}
      </div>
      <div className="button-container">
        <button
          className={capturedImage ? "reset-button" : "capture-button"}
          onClick={capturedImage ? resetCapture : capture}
        >
          {capturedImage ? "Retake Photo" : "Capture Photo"}
        </button>
      </div>
      {skinTone && (
        <div className="result-container">
          <p>Your Skin Tone: {skinTone}</p>
        </div>
      )}
    </div>
  );
};

export default Analyze;
