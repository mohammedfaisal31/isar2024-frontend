import React, { useState } from "react";
import axios from "axios";
import './createEvent.css';
import { API_ROUTES } from "../app-modules/api_routes";

const CreateEventForm = () => {
    const [newEvent, setNewEvent] = useState({
        title: '',
        start_time: '',
        end_time: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_ROUTES.createEvent, newEvent);
            setNewEvent({
                title: '',
                start_time: '',
                end_time: ''
            });
            alert('Event created successfully!');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        }
    };

    return (
        <div className="event-form-container">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        name="start_time"
                        value={newEvent.start_time}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        name="end_time"
                        value={newEvent.end_time}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEventForm;