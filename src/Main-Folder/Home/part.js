import React, { useState } from 'react';
import axios from 'axios';

const CheckParticipation = () => {
    const [paymentId, setPaymentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setPaymentId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/checkParticipation', { payment_id: paymentId });
            setMessage(response.data);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Check Participation</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Payment ID:
                    <input type="text" value={paymentId} onChange={handleChange} />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Check'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CheckParticipation;