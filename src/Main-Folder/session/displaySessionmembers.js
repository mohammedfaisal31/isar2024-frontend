import React, { useState, useEffect } from "react";
import './session.css';
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import menuIcon from '../images/icons8-menu-50.png';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { API_ROUTES } from "../app-modules/api_routes";

const MembersDisplaySession = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const { session_id } = useParams(); // Get session_id from URL parameters

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${API_ROUTES.getMembersBySession}/${session_id}`);
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, [session_id]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="div_main_dashboard">
            <div className="dashboard_header_container">
                <header className="dashboard_header">
                    <div className="header_left">
                        <img src={menuIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
                        <h1>Session Members</h1>
                        <Link to='/session'>
                        <button className="print-btn">Back</button>
                        </Link>
                    </div>
                </header>
            </div>
            <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className="members-container">
                <h2>Members in Session {session_id}</h2>
                <ul>
                    {members.map(member => (
                        <li key={member.user_id}>
                            <p>Name: {member.user_first_name} {member.user_last_name}</p>
                            <p>Email: {member.user_email}</p>
                            <p>Phone: {member.user_phone}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MembersDisplaySession;