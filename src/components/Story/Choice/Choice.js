import React from 'react';
import './Choice.scss';

const Choice = props => {
    return (
        <div className="Choice">
            <h1 className="Choice__title">Day {props.day}</h1>
            <button className="Choice__helpBtn" onClick={props.handleHelpClick}><span className="material-icons">help</span></button>
            <div className="Choice__options">
                {props.elements.map((el => (
                        <div className="Choice__options--option" key={el.id} onClick={props.handleElementClick(el.id)} id={`option_${el.id}`}>
                            <div className="Choice__options--option-emoji">
                            <span
                                role="img"
                                aria-label="Mushroom"
                            >
                                {el.emoji}
                            </span>
                            </div>
                            <p className="Choice__options--option-name">{el.value}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default Choice;