import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from './_pages/LoginSignup';
import DashboardHome from './_pages/Dasboard';

const RouteMap: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/" element={<DashboardHome />} />
        </Routes>
    );
};

export default RouteMap;

// redux set chenayam