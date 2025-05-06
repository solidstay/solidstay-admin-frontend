// components/SidebarLayout/SidebarLayout.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import './Sidebar.css'; // if needed

const SidebarLayout = ({ children }) => {
    return (
        <div className="page">
            <Sidebar />
            <div className="content margin-content">
                {children}
            </div>
        </div>
    );
};

export default SidebarLayout;
