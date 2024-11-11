import React from 'react';
import './features.css'; // Import the CSS file
import Slider from 'react-slick'; // Import Slider from React Slick
import 'slick-carousel/slick/slick.css'; // Import slick carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel theme CSS

// Import images
import destination1 from './pics/p1.jpg';
import destination2 from './pics/p14.webp';
import destination3 from './pics/p3.jpg';
import destination4 from './pics/p4.jpg';
import destination5 from './pics/p5.jpg';
import destination6 from './pics/p6.jpg';
import destination7 from './pics/p7.webp';
import destination8 from './pics/p11.jpg';
import destination9 from './pics/p9.webp';
import destination10 from './pics/p10.jpg';

const Features = () => {
  // Array to hold all destination images
  const destinationImages = [
    destination1,
    destination2,
    destination3,
    destination4,
    destination5,
    destination6,
    destination7,
    destination8,
    destination9,
    destination10
  ];

  // Settings for the React Slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="featured-page">
      <h1>Welcome to Your Next Adventure!</h1>
      <p>
        At [AIRMARX], we're passionate about providing unforgettable travel experiences. Whether you're dreaming of sandy beaches, historic landmarks, or bustling city streets, we have the perfect destination for you.
      </p>
      
      <h2>Why Choose Us?</h2>
      <ul>
        <li>User-Friendly Experience: Our website is designed with you in mind, making it easy to search for, compare, and book your ideal travel package.</li>
        <li>Endless Options: From luxury resorts to budget-friendly accommodations, we offer a wide range of options to suit every traveler's preferences and budget.</li>
        <li>Secure Booking: Rest assured that your personal information and payment details are safe and secure when booking through our platform.</li>
        <li>24/7 Customer Support: Have questions or need assistance? Our dedicated customer support team is available around the clock to help you every step of the way.</li>
      </ul>
      
      <h2>Featured Destinations</h2>
      {/* Slider to display featured destinations */}
      <Slider {...settings}>
        {destinationImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Destination ${index + 1}`} />
          </div>
        ))}
      </Slider>
      
      <h2>Start Planning Your Next Adventure</h2>
      <p>Ready to embark on your next journey? Begin your travel planning today by browsing our featured destinations, searching for flights and accommodations, and booking your dream getaway with ease.</p>
      
      {/* Additional sections such as newsletter signup, social media links, and contact us can be added here */}
    </div>
  );
}

export default Features;
