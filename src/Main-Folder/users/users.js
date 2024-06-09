import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './users.css';
import { API_ROUTES } from '../app-modules/api_routes';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="user-list">
            <h1>User List</h1>
            <input 
                type="text" 
                placeholder="Search by phone number" 
                value={searchTerm} 
                onChange={handleSearch} 
                className="search-bar"
            />
            <div className="cards">
                {filteredUsers.map(user => (
                    <div className="card" key={user.user_id}>
                        <div className="card-content">
                            <h2>{user.full_name}</h2>
                            <p>Phone: {user.user_phone}</p>
                            <div className="card-actions">
                                <button onClick={() => alert(`Details for ${user.full_name}`)}>Details</button>
                                <button onClick={() => alert(`Login as ${user.full_name}`)}>Login</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;