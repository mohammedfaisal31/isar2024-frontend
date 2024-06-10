import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './home.css';
import dashboardImg from '../images/icons8-dashboard-50.png';
import addMemberIcon from '../images/icons8-add-administrator-50.png'
import menuIcon from '../images/icons8-menu-50.png';
import createSessionIcon from '../images/icons8-session-timeout-50.png'
import createEventIcon from '../images/icons8-add-50.png'

const Navbar = ({ isMenuOpen, toggleMenu }) => {
    const [activeButton, setActiveButton] = useState(window.location.pathname);
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        setActiveButton(path);
        navigate(path);
    };


    return (
        <div className={`navbar-container ${isMenuOpen ? 'open' : ''}`}>
            <div className="navbar-header">
                <h2>KISAR</h2>
                <img src={menuIcon} alt="Close Menu" className="menu-icon-close" onClick={toggleMenu} />
            </div>
            <div className="navbar-buttons">
                <button className={activeButton === '/' ? 'active' : ''} onClick={() => handleButtonClick('/')}>
                    <img src={dashboardImg} alt="Dashboard" />
                    Dashboard
                </button>
                <button className={activeButton === '/create-session' ? 'active' : ''} onClick={() => handleButtonClick('/create-session')}>
                    <img src={createSessionIcon} alt="Create Session" />
                    Create Session 
                </button>
                <button className={activeButton === '/session' ? 'active' : ''} onClick={() => handleButtonClick('/session')}>
                    <img src={createSessionIcon} alt="Session" />
                    Session
                </button>
                <button className={activeButton === '/add-member' ? 'active' : ''} onClick={() => handleButtonClick('/add-member')}>
                    <img src={addMemberIcon} alt="Add member" />
                    Add Member
                </button>
                <button className={activeButton === '/create-event' ? 'active' : ''} onClick={() => handleButtonClick('/create-event')}>
                    <img src={createEventIcon} alt="create event" />
                    Create Event
                </button>
            </div>
        </div>
    );
}

export default Navbar;