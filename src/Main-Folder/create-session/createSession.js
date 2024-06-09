import React, { Fragment, useState } from "react";
import axios from 'axios';
import './createSession.css';
import Navbar from "../components/navbar";
import notiIcon from '../images/icons8-notifications-64.png';
import settingsIcon from '../images/icons8-settings-50.png';
import menuIcon from '../images/icons8-menu-50.png';
import { API_ROUTES } from "../app-modules/api_routes";

const CreateSession = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [lastSession, setLastSession] = useState(false);
    const [endTime, setEndTime] = useState('');
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_ROUTES.createSession, { title, lastSession });
            console.log(res.data.message);
            // Optionally reset form fields
            setTitle('');
            setLastSession(false);
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = '12'; // Defaulting to 12:00 PM, users can adjust manually
        const minutes = '00';
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <Fragment>
            <div className="div_main_dashboard">
                <div className="dashboard_header_container">
                    <header className="dashboard_header">
                        <div className="header_left">
                            <img src={menuIcon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
                            <h1>Create Session</h1>
                        </div>
                    </header>
                </div>
                <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div>
                    <form onSubmit={handleSubmit}  className="create-session-form">
                        <label>
                            Title:
                            <input className="" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </label>
                        <label>
            End Time:
            <input type="datetime-local" defaultValue={getCurrentDateTime()} onChange={(e) => setEndTime(e.target.value)} />
        </label>
                        <label>
                            Last Session:
                            <input type="checkbox" checked={lastSession} onChange={(e) => setLastSession(e.target.checked)} />
                        </label>
                        <button type="submit">Create Session</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default CreateSession;