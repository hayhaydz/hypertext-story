import React from 'react';
import { Link } from 'react-router-dom';
import './Instructions.scss';

function Instructions() {
    return(
        <div className="Instructions">
            <div className="Instructions__logo">
                <h1 className="Instructions__logo--top" >Student</h1>
                <h1 className="Instructions__logo--bottom" >Meals</h1>
            </div>
            <h2 className="Instructions__title">Instructions</h2>
            <div className="Instructions__content">
                <p className="Instructions__content--paragraph">Each day a selection of meal choices will be given to you, you will need to select the best meal choice for that day. Ensure that you maintain a healthy diet.</p>
            </div>
            <Link className="Instructions__btn" to="/Story">
                <span>Next</span> 
                <i className="material-icons">arrow_forward</i>
            </Link>
        </div>
    )
}

export default Instructions;