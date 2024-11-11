// booking.js

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, update, remove, onValue } from "firebase/database";
import './booking.css';

const Booking = () => {
  const db = getDatabase();
  const bookingsRef = ref(db, 'bookings');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [departure, setDeparture] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);

  const countries = [
    { name: 'PARIS', price: 100 },
    { name: 'NEW YORK', price: 150 },
    { name: 'SINGAPORE', price: 200 },
    { name: 'JAPAN', price: 120 },
    { name: 'PHILIPPINES', price: 180 },
    { name: 'THAILAND', price: 220 },
    { name: 'LOS ANGELES', price: 90 },
    { name: 'DUBAI', price: 160 },
    { name: 'SPAIN', price: 190 },
    { name: 'BRAZIL', price: 250 }
  ];




  const calculateTotalPrice = () => {
    if (numberOfTravelers && selectedCountry) {
      const country = countries.find(country => country.name === selectedCountry);
      if (country) {
        const totalPriceCalculation = parseInt(numberOfTravelers) * country.price;
        setTotalPrice(totalPriceCalculation);
      }
    }
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [numberOfTravelers, selectedCountry]);

  useEffect(() => {
    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBookings(Object.entries(data).map(([id, booking]) => ({ id, ...booking })));
      }
    });
  }, [bookingsRef]);
  useEffect(() => {
    if (showBookings) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showBookings]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      name,
      contactNumber,
      email,
      departure,
      numberOfTravelers,
      selectedCountry,
      departureDate,
      departureTime,
      returnDate,
      totalPrice
    };
    
    if (isSubmitted) {
      const bookingRef = ref(db, `bookings/${bookingInfo.id}`);
      update(bookingRef, bookingData);
    } else {
      const newBookingRef = push(bookingsRef);
      set(newBookingRef, bookingData);
    }
    clearFormFields();
    setIsSubmitted(false);
  };

  const clearFormFields = () => {
    setName('');
    setContactNumber('');
    setEmail('');
    setDeparture('');
    setNumberOfTravelers('');
    setSelectedCountry('');
    setDepartureDate('');
    setDepartureTime('');
    setReturnDate('');
    setTotalPrice(0);
  };
  const handleEditBooking = (booking) => {
    setName(booking.name);
    setContactNumber(booking.contactNumber);
    setEmail(booking.email);
    setDeparture(booking.departure);
    setNumberOfTravelers(booking.numberOfTravelers);
    setSelectedCountry(booking.selectedCountry);
    setDepartureDate(booking.departureDate);
    setDepartureTime(booking.departureTime);
    setReturnDate(booking.returnDate);
    setTotalPrice(booking.totalPrice);
    setIsSubmitted(true);
    setBookingInfo(booking);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };
  const handleCancelBooking = (booking) => {
    const bookingRef = ref(db, `bookings/${booking.id}`);
    remove(bookingRef).then(() => {
      setBookings(prevBookings => prevBookings.filter(b => b.id !== booking.id));
    }).catch(error => {
      console.error('Error removing booking: ', error);
    });
  };
  const toggleBookingView = () => {
    setShowBookings(!showBookings);
  };
  return (
    <div className="booking-container">
      <h2>Booking</h2>
      <p>Book your trip now!</p>
      <form onSubmit={handleSubmit}>
        <div className="booking-row">
          <div className="booking-col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="booking-col">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="booking-row">
          <div className="booking-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="booking-col">
            <label htmlFor="departure">Departure:</label>
            <input
              type="text"
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="booking-row">
          <div className="booking-col">
            <label htmlFor="numberOfTravelers">Number of Travelers:</label>
            <input
              type="number"
              id="numberOfTravelers"
              value={numberOfTravelers}
              onChange={(e) => setNumberOfTravelers(e.target.value)}
              required
            />
          </div>
          <div className="booking-col">
            <label htmlFor="selectedCountry">Country:</label>
            <select
              id="selectedCountry"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name} - ${country.price}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="booking-row">
          <div className="booking-col">
            <label htmlFor="departureDate">Departure Date:</label>
            <input
              type="date"
              id="departureDate"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </div>
          <div className="booking-col">
            <label htmlFor="departureTime">Departure Time:</label>
            <input
              type="time"
              id="departureTime"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="booking-row">
          <div className="booking-col">
            <label htmlFor="returnDate">Return Date:</label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <div className="booking-col">
            <label htmlFor="totalPrice">Total Price:</label>
            <input
              type="text"
              id="totalPrice"
              value={`$${totalPrice}`}
              readOnly
            />
          </div>
        </div>
        <div className="booking-row">
          <button type="submit">Book Flight now</button>
          <button type="button" onClick={clearFormFields}>Cancel Info</button>
        </div>
      </form>
      <button className="view-bookings-button" onClick={toggleBookingView}>
        {showBookings ? 'Hide Bookings' : 'View All Bookings'}
      </button>
      {showBookings && (
        <div className="history">
          <h2>Booking History</h2>
          {bookings.map((booking, index) => (
            <div className="booking-history-item" key={index}>
              <p>Name: {booking.name}</p>
              <p>Contact Number: {booking.contactNumber}</p>
              <p>Email: {booking.email}</p>
              <p>Departure: {booking.departure}</p>
              <p>Number of Travelers: {booking.numberOfTravelers}</p>
              <p>Country: {booking.selectedCountry}</p>
              <p>Departure Date: {booking.departureDate}</p>
              <p>Departure Time: {booking.departureTime}</p>
              <p>Return Date: {booking.returnDate}</p>
              <p>Total Price: ${booking.totalPrice}</p>
              <button className="edit-button" onClick={() => handleEditBooking(booking)}>Edit</button>
              <button className="cancel-button" onClick={() => handleCancelBooking(booking)}>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;