import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './users.css';
import { FaSearch } from 'react-icons/fa';
import QRCode from 'qrcode.react'; // Import the QRCode component
import { API_ROUTES } from '../app-modules/api_routes';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);

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

    const openQrModal = (user) => {
        setSelectedUser(user);
        setQrModalOpen(true);
    };

    const closeQrModal = () => {
        setQrModalOpen(false);
    };

    const handleLogin = (userId) => {
        axios.post(`${API_ROUTES.userLogin}/${userId}`)
            .then(response => {
                const updatedUsers = users.map(user => {
                    if (user.user_id === userId) {
                        return { ...user, successMsg: response.data.message, errorMsg: '' };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            })
            .catch(error => {
                console.error('Error logging in user:', error);
                const updatedUsers = users.map(user => {
                    if (user.user_id === userId) {
                        return { ...user, errorMsg: 'Error logging in user. Please try again later.', successMsg: '' };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            });
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
                                <button onClick={() => handleLogin(user.user_id)}>Login</button>
                            </div>
                            {user.errorMsg && <p className="error">{user.errorMsg}</p>}
                            {user.successMsg && <p className="success">{user.successMsg}</p>}
                            <button onClick={() => openQrModal(user)}>Show QR</button>
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
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            {qrModalOpen && selectedUser && (
                <div className="qr-modal">
                    <div className="qr-modal-content">
                        <span className="close" onClick={closeQrModal}>&times;</span>
                        <h2>QR Code for {selectedUser.full_name}</h2>
                        <QRCode value={selectedUser.user_id.toString()} />
                        <button className="print-btn" onClick={() => { window.print(); }}>Print</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;