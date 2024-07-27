import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from './_pages/LoginSignup';
import DashboardHome from './_pages/Dasboard';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const RouteMap: React.FC = () => {

    const auth = useSelector((state: RootState) => state.auth);
    console.log(auth)
    return (
        <Routes>
            {auth.isLoggedIn ?
                <Route path="/" element={<DashboardHome />} />
                :
                <Route path="/" element={<LoginSignUp />} />
            }
        </Routes>
    );
};

export default RouteMap;

// redux set chenayam