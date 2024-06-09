import React, { Fragment, useState } from "react";
import './home.css';
import Navbar from "../components/navbar";
import notiIcon from '../images/icons8-notifications-64.png';
import settingsIcon from '../images/icons8-settings-50.png';
import menuIcon from '../images/icons8-menu-50.png';
import UserList from "../users/users";

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                <div>
                    <UserList/>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;