import PulseLoader from 'react-spinners/PulseLoader';

import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
    return (
        <div className={classes['loading-spinner']}>
            <PulseLoader size="11px" margin="2px" color="olive" />
        </div>
    )
};

export default LoadingSpinner;
