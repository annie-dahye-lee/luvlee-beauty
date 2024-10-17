import React from 'react';
import './Analyze.css';
import Webcam from "react-webcam";

const Analyze = () => {
    const submitForm = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        alert("Form submitted");
    }

    return (
        <div className="home-container">
            <div className="container">
                <div className="text">
                    <h1>Take a photo</h1>
                    <form className="form" onSubmit={submitForm}>
                        <Webcam /> {/* Use the webcam capture component */}
                        <button type="submit" id="login-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Analyze;
