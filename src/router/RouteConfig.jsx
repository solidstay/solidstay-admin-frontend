import Login from '../pages/common/Login/Login.jsx';
import Register from '../pages/common/Register/Register.jsx';
import ForgotPassword from '../pages/common/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from '../pages/common/ResetPassword/ResetPassword.jsx';
import CompanyDashboard from '../pages/company/Dashboard/Dashboard.jsx';
import CompanyCampaigns from '../pages/company/Campaigns/Campaigns.jsx';
import Redirect from '../pages/common/Redirect/Redirect.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';
import Home from '../pages/home/Home.jsx';
import AddProperties from '../pages/home/components/AddProperties.jsx';
import Bookings from '../pages/home/Bookings.jsx';

const routes = [
  { path: "/company/dashboard", element: <CompanyDashboard />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/company/campaigns", element: <CompanyCampaigns />, protected: true, authRedirect: false, showSidebar: true },
  
  { path: "/home", element: <Home />, protected: false, authRedirect: false, showSidebar: true },
  { path: "/bookings", element: <Bookings />, protected: false, authRedirect: false, showSidebar: true },
  { path: "/add-property", element: <AddProperties />, protected: false, authRedirect: false, showSidebar: true },
  { path: "/edit-property/:id", element: <AddProperties />, protected: false, authRedirect: false, showSidebar: true },

  { path: "/", element: <Redirect />, protected: true, authRedirect: false, showSidebar: false },
  { path: "/login", element: <Login />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/register", element: <Register />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/forgot-password", element: <ForgotPassword />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/reset-password", element: <ResetPassword />, protected: false, authRedirect: true, showSidebar: false },
  { path: "*", element: <NotFound />, protected: false, showSidebar: false },
];

export default routes;
