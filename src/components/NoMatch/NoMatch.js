import React from 'react';
import { useLocation } from 'react-router-dom';
import './NoMatch.scss';

const NoMatch = () => {
    let location = useLocation();

    return(
        <div className="NoMatch">
            <h3>No match for <code>{location.pathname}</code></h3>
        </div>
    )
}

export default NoMatch;