import React from 'react';
import './Interlude.scss';

const Interlude = props => {
    return (
        <div className="Interlude">
            {/* <h1 className="Interlude__day">Day {this.state.day}</h1> */}
            <h1 className="Interlude__title">{props.title}</h1>
            <p className="Interlude__text">{props.details}</p>
        </div>
    )
}

export default Interlude;