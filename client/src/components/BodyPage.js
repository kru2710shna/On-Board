// src/components/BodyPage.js
import React from 'react';
import '../BodyPage.css'; // Optional: For additional styles
import Jobs from './Jobs';

const BodyPage = ({ isDarkMode }) => {
    return (

        <>
            <Jobs />
        </>
    );
};

export default BodyPage;
