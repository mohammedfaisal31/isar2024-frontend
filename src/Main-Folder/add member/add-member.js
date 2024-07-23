import React, { Fragment, useState } from "react";
import './addMember.css';
import Navbar from "../components/navbar";
import menuIcon from '../images/icons8-menu-50.png';
import axios from "axios";
import { API_ROUTES } from "../app-modules/api_routes";

const AddMember = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    user_honorific: '',
    user_first_name: '',
    user_middle_name: '',
    user_last_name: '',
    user_email: '',
    user_phone: '',
    user_address: '',
    user_city: '',
    user_state_of_practice: '',
    user_med_council_number: '',
    user_organisation: '',
    user_category: '',
    user_type: '',
    user_package_id: '',
    user_payment_id: '', // New field for payment ID
    user_registration_type: 'online' // Default registration type
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateUniquePaymentId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let paymentId = '';
    for (let i = 0; i < 5; i++) {
      paymentId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return paymentId;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Generate a unique payment ID if not manually entered
    let { user_payment_id, user_registration_type, ...restFormData } = formData;
    if (user_registration_type === 'online' && !user_payment_id) {
      user_payment_id = generateUniquePaymentId();
    }

    // Include the payment ID, registration type, and other form data
    const dataToSubmit = { ...restFormData, user_payment_id, user_registration_type };

    // Send form data to server
    axios.post(API_ROUTES.addMember, dataToSubmit)
      .then(response => {
        console.log('Member added successfully:', response.data);
        // Reset form data after successful submission
        setFormData({
          user_honorific: '',
          user_first_name: '',
          user_middle_name: '',
          user_last_name: '',
          user_email: '',
          user_phone: '',
          user_address: '',
          user_city: '',
          user_state_of_practice: '',
          user_med_council_number: '',
          user_category: '',
          user_type: '',
          user_package_id: '',
          user_payment_id: '',
          user_registration_type: 'online' // Reset to default after submission
        });
      })
      .catch(error => {
        console.error('Error adding member:', error.response.data);
        // Display error message
        setErrorMessage(error.response.data);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeModal = () => {
    setErrorMessage('');
  };

  return (
    <Fragment>
      <div className="div_main_dashboard">
        <div className="dashboard_header_container">
          <header className="dashboard_header">
            <div className="header_left">
              <img src={menuIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
              <h1>Add member</h1>
            </div>
          </header>
        </div>
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div className="form-container">
          <h2>Add Member</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required />
            </label>
            <label>
              Honorific:
              <select name="user_honorific" value={formData.user_honorific} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Dr">Dr</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
              </select>
            </label>
            <label>
              First Name:
              <input type="text" name="user_first_name" value={formData.user_first_name} onChange={handleChange} required />
            </label>
            <label>
              Middle Name:
              <input type="text" name="user_middle_name" value={formData.user_middle_name} onChange={handleChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="user_last_name" value={formData.user_last_name} onChange={handleChange} required />
            </label>
            <label>
              Phone Number:
              <input type="text" name="user_phone" value={formData.user_phone} onChange={handleChange} required />
            </label>
            <label>
              Address:
              <input type="text" name="user_address" value={formData.user_address} onChange={handleChange} />
            </label>
            <label>
              City:
              <input type="text" name="user_city" value={formData.user_city} onChange={handleChange} />
            </label>
            <label>
              State:
              <input type="text" name="user_state_of_practice" value={formData.user_state_of_practice} onChange={handleChange} />
            </label>
            <label>
              Medical Council Number:
              <input type="text" name="user_med_council_number" value={formData.user_med_council_number} onChange={handleChange} />
            </label>
            <label>
              Organisation:
              <input type="text" name="user_organisation" value={formData.user_organisation} onChange={handleChange} />
            </label>
            <label>
              Category:
              <select name="user_category" value={formData.user_category} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Delegate">Delegate</option>
                <option value="Faculty">Faculty</option>
              </select>
            </label>
            <label>
              Visitor Type:
              <select name="user_type" value={formData.user_type} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Clinician">Clinician</option>
                <option value="Embryologist">Embryologist</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Package ID:
              <select name="user_package_id" value={formData.user_package_id} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="1">NR1-1</option>
                <option value="2">NR1-2</option>
                <option value="3">SO1-1</option>
                <option value="4">SO1-2</option>
                <option value="5">DO1-1</option>
                <option value="6">DO1-2</option>
              </select>
            </label>
            <label>
              Payment Type:
              <select name="user_registration_type" value={formData.user_registration_type} onChange={handleChange} required>
                <option value="online">Online</option>
                <option value="cash">Cash</option>
              </select>
            </label>
            {formData.user_registration_type === 'online' && (
              <label>
                Payment ID:
                <input type="text" name="user_payment_id" value={formData.user_payment_id} onChange={handleChange} required={!formData.user_payment_id} />
              </label>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
        {errorMessage && (
          <div className="error-modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default AddMember;