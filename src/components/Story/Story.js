import React from 'react';
import axios from 'axios';
import './Story.scss';

import Choice from './Choice/Choice';
import Interlude from './Interlude/Interlude';

class Story extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: 1,
            score: 0,
            selectionMade: false,
            choices: [],
            choicesIndex: 0,
            choiceElements: [],
            events: [],
            eventsIndex: 0,
            eventElement: [],
            renderChoice: true
        };

        this.handleElementClick = this.handleElementClick.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
    }

    componentDidMount = () => {
        // Fetch choices
        axios.get('./data_choices.json').then(res => {
            const choices = this.shuffleArray(res.data.choices);
            this.setState({choices}, () => {
                this.setState({choiceElements: this.state.choices[0]}, () => {
                    let choiceElementsD = this.shuffleArray(this.state.choiceElements);
                    this.setState({choiceElements: choiceElementsD});
                });
            });
        })

        axios.get('./data_events.json').then(res => {
            // Fetch interlude events
            const events = res.data.events;
            this.setState({events}, () => {
                this.setState({eventElement: this.state.events[this.state.eventsIndex][1]});
            });
        })
    }

    // Shuffle choiceElements
    // https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
    shuffleArray = array => {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    handleElementClick = index => event => {
        // preventing any default DOM action from clicking
        event.preventDefault();

        // Allowing the next button to be enabled by changing this boolean variable
        if(!this.state.selectionMade) {
            this.setState({selectionMade: true});
        }

        // Reseting selected classes on other elements
        let selectedOption = document.getElementById('option_' + index);
        selectedOption.classList.add('Choice__options--option-selected');
        let choiceElementsD = this.state.choiceElements;
        for (let i = 0; i < choiceElementsD.length; i++) {
            if(choiceElementsD[i].id !== index) {
                if(choiceElementsD[i].selected) {
                    let element = this.state.choiceElements[i];
                    let removeClassOption = document.getElementById('option_' + element.id);
                    removeClassOption.classList.remove('Choice__options--option-selected');
                    choiceElementsD[i].selected = false;
                }
            } else {
                choiceElementsD[i].selected = true;
            }
        }

        this.setState({choiceElements: choiceElementsD});
    }

    handleBtnClick = e => {
        e.preventDefault();
        // If the current rendered component is the choice component
        if (this.state.renderChoice) {
            // Reset selected class elements
            let resetElement = document.getElementsByClassName('Choice__options--option-selected');
            resetElement[0].classList.remove('Choice__options--option-selected');
            //Score Delegation
            for (let i = 0; i < this.state.choiceElements.length; i++) {
                if (this.state.choiceElements[i].selected) {
                    switch(this.state.choiceElements[i].quality) {
                        case 'good':
                            this.setState({score: this.state.score + 5});
                            break;
                        case 'okay':
                            this.setState({score: this.state.score + 1});
                            break;
                        case 'bad':
                            this.setState({score: this.state.score - 5});
                            break;
                        default:
                            this.setState({score: this.state.score});
                            break;
                    }
                }
            }
            // Progress day forward and reset selection made boolean
            this.setState({day: this.state.day + 1, selectionMade: false});
            // Assign new elements for next day
            this.setState({choicesIndex: this.state.choicesIndex + 1}, () => {
                let choiceElementsD = this.shuffleArray(this.state.choices[this.state.choicesIndex]);
                this.setState({choiceElements: choiceElementsD});
            });

            // Select interlude event data based on score
            if(this.state.score >= (this.state.day - 1) * 5) {
                // Doing good
                let eventsD = this.state.events;
                let eventElementD = eventsD[this.state.eventsIndex][0];
                this.setState({eventElement: eventElementD});
            } else if (this.state.score >= (this.state.day - 1) * 1) {
                // Doing okay
                let eventsD = this.state.events;
                let eventElementD = eventsD[this.state.eventsIndex][1];
                this.setState({eventElement: eventElementD});
            } else if(this.state.score <= 0) {
                // Doing bad
                let eventsD = this.state.events;
                let eventElementD = eventsD[this.state.eventsIndex][2];
                this.setState({eventElement: eventElementD});
            }

            if(this.state.day % 5 === 0) {
                this.setState({renderChoice: false});
            }
        } else {
            // if the current rendered component is the interlude component the next button will run this code
            // this code is moving the event index forward and re enabling the choice render boolean
            this.setState({eventsIndex: this.state.eventsIndex + 1, renderChoice: true});
        }
    }
    
    render = () => {
        return (
            <div className="Story">
                {this.state.renderChoice
                    ? <Choice elements={this.state.choiceElements} day={this.state.day} handleElementClick={this.handleElementClick} />
                    : <Interlude title={this.state.eventElement.title} details={this.state.eventElement.details} />
                }
                <button className="Story__btn" onClick={(e) => this.handleBtnClick(e)} disabled={!this.state.selectionMade && this.state.renderChoice}>
                    <span>Next</span> 
                    <i className="material-icons">arrow_forward</i>
                </button>
            </div>
        )
    }
}

export default Story;