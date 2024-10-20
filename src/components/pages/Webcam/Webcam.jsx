import React, { useState } from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 220,
    height: 180,
    facingMode: "user"
};

export const WebcamCapture = () => {
    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);

    // Function to capture an image
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);  // Store captured image
    }, [webcamRef]);

    return (
        <div className="webcam-container">
            <div className="webcam-img">
                {/* Display the webcam feed if no image is captured yet */}
                {image === '' ? (
                    <Webcam
                        audio={false}
                        height={180}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={220}
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={image} alt="Captured" />
                )}
            </div>
            <div>
                {image !== '' ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setImage('');  // Reset to show the webcam feed again
                        }}
                        className="webcam-btn">
                        Retake Image
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            capture();  // Capture the image
                        }}
                        className="webcam-btn">
                        Capture
                    </button>
                )}
            </div>
        </div>
    );
};
