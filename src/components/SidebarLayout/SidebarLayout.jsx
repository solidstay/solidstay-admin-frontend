import Sidebar from '../Sidebar/Sidebar.jsx';
import './Sidebar.css'; // if needed
import PropTypes from 'prop-types';

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
SidebarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarLayout;

