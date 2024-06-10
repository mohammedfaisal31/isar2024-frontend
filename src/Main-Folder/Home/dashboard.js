import React, { Fragment, useState, useEffect } from "react";
import './home.css';
import Navbar from "../components/navbar";
import notiIcon from '../images/icons8-notifications-64.png';
import settingsIcon from '../images/icons8-settings-50.png';
import menuIcon from '../images/icons8-menu-50.png';
import UserList from "../users/users";
import axios from 'axios';
import { API_ROUTES } from '../app-modules/api_routes';

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchCurrentEvent = () => {
        axios.get(API_ROUTES.currentEvent)
            .then(response => {
                setCurrentEvent(response.data);
            })
            .catch(error => {
                console.error('Error fetching current event:', error);
            });
    };

    useEffect(() => {
        fetchCurrentEvent();
    }, []);

    const handleEndEvent = () => {
        axios.post(API_ROUTES.endEvent)
            .then(response => {
                setCurrentEvent(null); // Update state to reflect that the event has ended
                console.log('Event ended successfully:', response.data);
                // Optionally, you can update the UI or show a success message
            })
            .catch(error => {
                console.error('Error ending event:', error);
                // Optionally, you can display an error message to the user
            });
    };

    return (
        <Fragment>
            <div className="div_main_dashboard">
                <div className="dashboard_header_container">
                    <header className="dashboard_header">
                        <div className="header_left">
                            <img src={menuIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
                            <h1>Dashboard</h1>
                        </div>
                    </header>
                </div>
                <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div className="current-event-container">
                    <div className="current-event">
                        <h2>Current Event:</h2>
                        {currentEvent ? (
                            <div>
                                <p>Title: {currentEvent.title}</p>
                                <p>Start Time: {currentEvent.start_time}</p>
                                <p>End Time: {currentEvent.end_time}</p>
                                <button className="end-event-btn" onClick={handleEndEvent}>End Event</button>
                            </div>
                        ) : (
                            <p>No active event</p>
                        )}
                    </div>
                </div>
                <UserList />
            </div>
        </Fragment>
    );
}

export default Dashboard;