import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import QRCode from 'qrcode.react'; // Import the QRCode component
import { API_ROUTES } from '../Main-Folder/app-modules/api_routes';

const UsersPrint = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        axios.get(API_ROUTES.displayUsers)
            .then(response => {
                setUsers(response.data.filter(user => user.user_payment_id !== 'MOJO'));
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleCheckboxChange = (event, userId) => {
        toggleUserSelection(userId);
    };

    const handleSelectAll = () => {
        const allUserIds = users.map(user => user.user_payment_id);
        setSelectedUsers(allUserIds);
    };

    const handleDeselectAll = () => {
        setSelectedUsers([]);
    };

    const handleDownload = () => {
        // URL to send the array of user_payment_ids
        const downloadURL = 'https://srv491382.hstgr.cloud/kisar/generate_badges';
        
        // POST request to send selected user_payment_ids and receive the file
        axios.post(downloadURL, { payment_ids: selectedUsers }, { responseType: 'blob' })
            .then(response => {
                // Create a blob from the response data
                const blob = new Blob([response.data], { type: 'application/zip' });
                const url = window.URL.createObjectURL(blob);
                // Create a temporary link element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'badges.zip';
                document.body.appendChild(a);
                a.click();
                // Cleanup
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error downloading payment IDs:', error);
            });
    };

    const filteredUsers = users.filter(user =>
        (user.user_phone.includes(searchTerm) ||
        user.user_email.toLowerCase().includes(searchTerm) ||
        user.user_payment_id.toLowerCase().includes(searchTerm) ||
        user.full_name.toLowerCase().includes(searchTerm)) &&
        user.user_payment_id.toUpperCase() !== 'MOJO'
    );

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
            <div className="actions-container">
                <button onClick={handleSelectAll}>Select All</button>
                <button onClick={handleDeselectAll}>Deselect All</button>
            </div>
            <div className="cards">
                {filteredUsers.map(user => (
                    <div className="card" key={user.user_id}>
                        <div className="card-content">
                            <h2>{user.full_name}</h2>
                            <p>Phone: {user.user_phone}</p>
                            <div className="card-actions">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.user_payment_id)}
                                    onChange={(event) => handleCheckboxChange(event, user.user_payment_id)}
                                />
                            </div>
                            {user.errorMsg && <p className="error">{user.errorMsg}</p>}
                            {user.successMsg && <p className="success">{user.successMsg}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="download-section">
                <button
                    onClick={handleDownload}
                    disabled={selectedUsers.length === 0}
                >
                    Download Badges
                </button>
            </div>
        </div>
    );
};

export default UsersPrint;