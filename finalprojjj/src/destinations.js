import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './destination.css'; // Import your CSS file for styling
import destination1 from './pics/p1.jpg';
import destination2 from './pics/p2.jpg';
import destination3 from './pics/p3.jpg';
import destination4 from './pics/p4.jpg';
import destination5 from './pics/p5.jpg';
import destination6 from './pics/p6.jpg';
import destination7 from './pics/p7.webp';
import destination8 from './pics/p8.jpg';
import destination9 from './pics/p9.webp';
import destination10 from './pics/p10.jpg';

// Import heart icon
import { FaHeart } from 'react-icons/fa';

const Destinations = () => {
  const navigate = useNavigate();
  // Define some sample destinations
  const destinations = [
    { id: 1, name: 'PARIS', price: '$100', image: destination1 },
    { id: 2, name: 'NEW YORK', price: '$150', image: destination2 },
    { id: 3, name: 'SINGAPORE', price: '$200', image: destination3 },
    { id: 4, name: 'JAPAN', price: '$120', image: destination4 },
    { id: 5, name: 'PHILIPPINES', price: '$180', image: destination5 },
    { id: 6, name: 'THAILAN', price: '$220', image: destination6 },
    { id: 7, name: 'LOS ANGELES', price: '$90', image: destination7 },
    { id: 8, name: 'DUBAI', price: '$160', image: destination8 },
    { id: 9, name: 'SPAIN', price: '$190', image: destination9 },
    { id: 10, name: 'BRAZIL', price: '$250', image: destination10 },
  ];

  // State to manage liked destinations
  const [likedDestinations, setLikedDestinations] = useState([]);

  // Function to handle liking a destination
  const handleLike = (id) => {
    if (likedDestinations.includes(id)) {
      // Remove from liked destinations
      setLikedDestinations(likedDestinations.filter((destId) => destId !== id));
    } else {
      // Add to liked destinations
      setLikedDestinations([...likedDestinations, id]);
    }
  };

  // Function to handle booking
  const handleBookNow = (id) => {
    // Handle booking logic here
    console.log(`Book now for destination with ID: ${id}`);
    // Navigate to the booking page
    navigate('/booking');
  };

  return (
    <div className="destinations-container">
      {/* Destination cards */}
      <div className="destination-cards">
        {destinations.map((destination) => (
          <div className="destination-card" key={destination.id}>
            <img src={destination.image} alt={destination.name} />
            <div className="destination-info">
              <h3>{destination.name}</h3>
              <p>Price: {destination.price}</p>
              {/* Heart icon */}
              <FaHeart
                className={likedDestinations.includes(destination.id) ? 'heart liked' : 'heart'}
                onClick={() => handleLike(destination.id)}
              />
              {/* Book now button */}
              <button
  className="book-now-btn"
  onClick={() => handleBookNow(destination.id, destination.name)}
>
  Book Now
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
