import React, { useState } from 'react';
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 250, // Adjusted width
    height: 200, // Adjusted height
    facingMode: "user"
};

export const WebcamCapture = () => {
    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    });

    return (
        <div className="webcam-container">
            <div className="webcam-img">
                {image === '' ? (
                    <Webcam
                        audio={false}
                        height={200} // Adjusted height
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={250} // Adjusted width
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={image} alt='Captured' />
                )}
            </div>
            <div>
                {image !== '' ? (
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('');
                    }} className="webcam-btn">
                        Retake Image
                    </button>
                ) : (
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }} className="webcam-btn">
                        Capture
                    </button>
                )}
            </div>
        </div>
    );
};