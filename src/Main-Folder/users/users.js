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
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        user_honorific: '',
        user_first_name: '',
        user_middle_name: '',
        user_last_name: '',
        user_email: '',
        user_phone: '',
        user_med_council_number: '',
        user_category: '',
        user_type: '',
        user_package_id: '',
        user_city: '',
        user_state_of_practice: ''
    });

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
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(user =>
        user.user_phone.includes(searchTerm) ||
        user.user_email.toLowerCase().includes(searchTerm) ||
        user.user_payment_id.toLowerCase().includes(searchTerm) ||
        user.full_name.toLowerCase().includes(searchTerm)
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

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditedUser({
            user_honorific: user.user_honorific,
            user_first_name: user.user_first_name,
            user_middle_name: user.user_middle_name,
            user_last_name: user.user_last_name,
            user_email: user.user_email,
            user_phone: user.user_phone,
            user_med_council_number: user.user_med_council_number,
            user_category: user.user_category,
            user_type: user.user_type,
            user_package_id: user.user_package_id,
            user_city: user.user_city,
            user_state_of_practice: user.user_state_of_practice
        });
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedUser(null);
        setEditedUser({
            user_honorific: '',
            user_first_name: '',
            user_middle_name: '',
            user_last_name: '',
            user_email: '',
            user_phone: '',
            user_med_council_number: '',
            user_category: '',
            user_type: '',
            user_package_id: '',
            user_city: '',
            user_state_of_practice: ''
        });
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = (userId) => {
        axios.put(`${API_ROUTES.updateUser}/${userId}`, editedUser)
            .then(response => {
                // Update the user list on success
                const updatedUsers = users.map(user => {
                    if (user.user_id === userId) {
                        return { ...user, ...editedUser };
                    }
                    return user;
                });
                setUsers(updatedUsers);
                closeEditModal();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                // Handle error if needed
            });
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
                    placeholder="Search by phone number, email, payment ID, or name"
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
                                <button onClick={() => openQrModal(user)}>Show QR</button>
                                <button onClick={() => openEditModal(user)}>Edit</button>
                            </div>
                            {user.user_payment_id === 'MOJO' && (
                                <p className="error">Payment not done</p>
                            )}
                            {user.errorMsg && <p className="error">{user.errorMsg}</p>}
                            {user.successMsg && <p className="success">{user.successMsg}</p>}
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
                        <p>Payment ID: {selectedUser.user_payment_id}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {qrModalOpen && selectedUser && (
                <div className="qr-modal">
                    <div className="qr-modal-content">
                        <span className="close" onClick={closeQrModal}>&times;</span>
                        <h2>QR Code for {selectedUser.full_name}</h2>
                        <QRCode value={selectedUser.user_payment_id.toString()} /><br/>
                        <button className="print-btn" onClick={() => { window.print(); }}>Print</button>
                    </div>
                </div>
            )}

            {editModalOpen && selectedUser && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Edit Details for {selectedUser.full_name}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(selectedUser.user_id); }}>
                            <label>
                                Honorific:
                                <input
                                    type="text"
                                    name="user_honorific"
                                    value={editedUser.user_honorific}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="user_first_name"
                                    value={editedUser.user_first_name}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Middle Name:
                                <input
                                    type="text"
                                    name="user_middle_name"
                                    value={editedUser.user_middle_name}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="user_last_name"
                                    value={editedUser.user_last_name}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="user_email"
                                    value={editedUser.user_email}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="tel"
                                    name="user_phone"
                                    value={editedUser.user_phone}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Medical Council Number:
                                <input
                                    type="text"
                                    name="user_med_council_number"
                                    value={editedUser.user_med_council_number}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Category:
                                <input
                                    type="text"
                                    name="user_category"
                                    value={editedUser.user_category}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Type:
                                <input
                                    type="text"
                                    name="user_type"
                                    value={editedUser.user_type}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Package ID:
                                <input
                                    type="text"
                                    name="user_package_id"
                                    value={editedUser.user_package_id}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                City:
                                <input
                                    type="text"
                                    name="user_city"
                                    value={editedUser.user_city}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                State of Practice:
                                <input
                                    type="text"
                                    name="user_state_of_practice"
                                    value={editedUser.user_state_of_practice}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;