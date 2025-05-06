import DashboardIcon from '../assets/icons/dashboard_icon.svg?react';
import CampaignsIcon from '../assets/icons/campaigns_icon.svg?react';
export const menuItems = {
    admin: [
    ],
    company: [
        { path: '/company/dashboard', label: 'Dashboard', icon: <DashboardIcon />, disabled: false },
        { path: '/company/campaigns', label: 'Campaigns', icon: <CampaignsIcon />, disabled: false },  
    ],
    user: [
        ],
};
