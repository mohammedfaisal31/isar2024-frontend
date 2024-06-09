import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './users.css';
import { FaSearch } from 'react-icons/fa';
import { API_ROUTES } from '../app-modules/api_routes';
import QRCode from 'qrcode.react'; // Import the QRCode component

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get(API_ROUTES.displayUsers)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user => 
        user.user_phone.includes(searchTerm)
    );

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="user-list">
            <h1>Members List</h1>
            <div className="search-container">
                <FaSearch className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search by phone number" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="search-bar"
                />
            </div>
            <div className="cards">
                {filteredUsers.map(user => (
                    <div className="card" key={user.user_id}>
                        <div className="card-content">
                            <h2>{user.full_name}</h2>
                            <p>Phone: {user.user_phone}</p>
                            <div className="card-actions">
                                <button onClick={() => openModal(user)}>Details</button>
                                <button onClick={() => alert(`Login as ${user.full_name}`)}>Login</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedUser.full_name}</h2>
                        <p>Honorific: {selectedUser.user_honorific}</p>
                        <p>First Name: {selectedUser.user_first_name}</p>
                        <p>Middle Name: {selectedUser.user_middle_name}</p>
                        <p>Last Name: {selectedUser.user_last_name}</p>
                        <p>Email: {selectedUser.user_email}</p>
                        <p>Phone: {selectedUser.user_phone}</p>
                        <p>Medical Council Number: {selectedUser.user_med_council_number}</p>
                        <p>Category: {selectedUser.user_category}</p>
                        <p>Type: {selectedUser.user_type}</p>
                        <p>City: {selectedUser.user_city}</p>
                        <p>State of Practice: {selectedUser.user_state_of_practice}</p>
                        <p>Payment Status: {selectedUser.user_payment_status}</p>
                        <p>Registration Type: {selectedUser.user_registration_type}</p>
                        <QRCode value={selectedUser.user_id.toString()} /> {/* Pass user_id as value to generate QR code */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;