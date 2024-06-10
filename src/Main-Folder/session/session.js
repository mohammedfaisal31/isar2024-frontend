import React, { useState, useEffect } from "react";
import './session.css';
import Navbar from "../components/navbar";
import menuIcon from '../images/icons8-menu-50.png';
import axios from 'axios';
import { API_ROUTES } from "../app-modules/api_routes";

const Session = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSessions, setActiveSessions] = useState([]);
    const [inactiveSessions, setInactiveSessions] = useState([]);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const activeResponse = await axios.get(API_ROUTES.displayActiveSession);
            const inactiveResponse = await axios.get(API_ROUTES.displayInactiveSession);
            setActiveSessions(activeResponse.data);
            setInactiveSessions(inactiveResponse.data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const endSession = async (sessionId) => {
        try {
            await axios.put(`${API_ROUTES.endSession}/${sessionId}`);
            fetchSessions(); // Refresh the sessions after ending one
        } catch (error) {
            console.error('Error ending session:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="div_main_dashboard">
            <div className="dashboard_header_container">
                <header className="dashboard_header">
                    <div className="header_left">
                        <img src={menuIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
                        <h1>Session</h1>
                    </div>
                </header>
            </div>
            <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className="session-container">
                <div className="active-sessions">
                    <h2>Active Sessions</h2>
                    <ul>
                        {activeSessions.map(session => (
                            <li key={session.session_id}>
                                <p>Title: {session.title}</p>
                                <p>Start Time: {new Date(session.start_time).toLocaleString()}</p>
                                <p>End Time: {new Date(session.end_time).toLocaleString()}</p>
                                <button onClick={() => endSession(session.session_id)}>End</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="inactive-sessions">
                    <h2>Inactive Sessions</h2>
                    <ul>
                        {inactiveSessions.map(session => (
                            <li key={session.session_id}>
                                <p>Title: {session.title}</p>
                                <p>Start Time: {new Date(session.start_time).toLocaleString()}</p>
                                <p>End Time: {new Date(session.end_time).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Session;