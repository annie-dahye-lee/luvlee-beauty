import React from 'react'
import CardItem from './CardItem'
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>See what we can uncover for you</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
        </div>
            <ul className="cards__items">
                <CardItem 
                src="images/hello kitty.jpeg"
                text="Upload a few selfies in proper lighting to begin"
                label='Your original selfie'
                path='/analyze'
                />
            </ul>
      </div>
    </div>
  )
}

export default Cards
