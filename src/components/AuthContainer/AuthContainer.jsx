import './AuthContainer.css';
import IllustrationIcon from '../../assets/icons/Illustration.svg';
import PropTypes from 'prop-types';

const AuthContainer = ({ children }) => {
    return (
        <div className="auth-container">
            <div className="container" id="container-1">
                <IllustrationIcon />
            </div>
            <div className="container" id="container-2">
                {children}
            </div>
        </div>
    );
};
AuthContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContainer;
