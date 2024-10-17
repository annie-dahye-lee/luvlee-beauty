import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>How does it work?</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/hello kitty.jpeg"
              text="Take a photo in proper lighting to begin"
              label="Your original selfie"
              path="/analyze"
            />
            <CardItem
              src="images/hello kitty.jpeg"
              text="AI will analyze your skin undertones and reveal yoru personal colour"
              label="Color Palette"
              path="/analyze"
            />
            <CardItem
              src="images/hello kitty.jpeg"
              text="Based on your unique colour profile, our app will recommend tailored Asian beauty products and complementary hair colors."
              label="Recommended and Unencouraged Shades"
              path="/analyze"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
