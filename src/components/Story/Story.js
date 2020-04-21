import React from 'react';
import './Story.scss';
import choicesJSON from '../../assets/json/data_choices.json';
import eventsJSON from '../../assets/json/data_events.json';

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
            renderChoice: true,
            helpCount: 0,
            helpCountUsed: false,
            message: {
                state: "",
                data: ""
            }
        };

        this.handleElementClick = this.handleElementClick.bind(this);
        this.handleHelpCLick = this.handleHelpCLick.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
    }

    componentDidMount() {
        // Setup choice data
        let choices = this.shuffleArray(choicesJSON.choices);
        this.setState({choices}, () => {
            this.setState({choiceElements: this.state.choices[0]}, () => {
                let choiceElementsD = this.shuffleArray(this.state.choiceElements);
                this.setState({choiceElements: choiceElementsD});
            });
        });

        // Setup interlude events
        let events = eventsJSON.events;
        this.setState({events}, () => {
            this.setState({eventElement: this.state.events[this.state.eventsIndex][1]});
        });

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

    displayMessage = (data, dataState, duration) => {
        let message = {
            state: dataState,
            data: data
        }
        this.setState({message: message},() => {
            let domElement = document.getElementById('story-message');
            domElement.style.opacity = 1;
            setTimeout(() => {
                domElement.style.opacity = 0;
                setTimeout(() => {
                    message.data = "";
                    this.setState({message: message});
                }, 200);
            }, duration);
        });
    }
 
    handleKeyPressed = (e, index) => {
        if(e.key === "Enter") {
            console.log(index);
            console.log('key pressed');
            this.handleElementClick(index);
        }
    }

    handleElementClick = index => {
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

    handleHelpCLick = e => {
        if (!this.state.helpCountUsed) {
            if(this.state.helpCount < 5) {
                for (let i = 0; i < this.state.choiceElements.length; i++) {
                    let currentElementID = this.state.choiceElements[i].id;
                    let domChoiceElement = document.getElementById('option_' + currentElementID).children[0];
                    switch (this.state.choiceElements[i].quality) {
                        case 'good':
                            domChoiceElement.classList.add('Choice__options--option-emoji--good');
                            break;
                        case 'okay':
                            domChoiceElement.classList.add('Choice__options--option-emoji--okay');
                            break;
                        case 'bad':
                            domChoiceElement.classList.add('Choice__options--option-emoji--bad');
                            break;
                        default:
                            break;
                    }
                }

                this.setState({helpCountUsed: true});
                this.setState({helpCount: this.state.helpCount + 1});
            } else {
                this.displayMessage("All helpful tips have been used!", "negative", 3000);
            }
        }
    }

    handleBtnClick = e => {
        e.preventDefault();
        // If the current rendered component is the choice component
        if (this.state.renderChoice) {
            if(this.state.day !== 20) {
                // Messages to give based on users choices
                let feedbackMessages = {
                    positive: [
                        "Wow! You're on fire.",
                        "You're acing this!",
                        "This is incredible work!",
                        "I've never seen someone do such a great job!",
                        "Hey! You're pretty good at this."
                    ],
                    okay: [
                        "That was alright I guess...",
                        "That wasn't the best choice... but it also wasn't the worst!",
                        "Eh, that was okay.",
                        "I guess it wasn't the worst choice you could have made.",
                        "I believe in you!"
                    ],
                    negative: [
                        "Wow, that was a terrible choice.",
                        "Better luck next time!",
                        "Ugh, I thought you were better than this...",
                        "You'll get it correct some day.",
                        "Whoops! That was the wrong choice."
                    ]
                }

                // Reset selected class elements
                let resetElement = document.getElementsByClassName('Choice__options--option-selected');
                resetElement[0].classList.remove('Choice__options--option-selected');
                //Score Delegation
                let choiceMade;
                for (let i = 0; i < this.state.choiceElements.length; i++) {
                    if (this.state.choiceElements[i].selected) {
                        switch(this.state.choiceElements[i].quality) {
                            case 'good':
                                this.setState({score: this.state.score + 10});
                                choiceMade = 'positive';
                                break;
                            case 'okay':
                                this.setState({score: this.state.score + 1});
                                choiceMade = 'okay';
                                break;
                            case 'bad':
                                this.setState({score: this.state.score - 5});
                                choiceMade = 'negative';
                                break;
                            default:
                                this.setState({score: this.state.score});
                                break;
                        }
                    }
                    if(this.state.helpCountUsed) {
                        let domElement = document.getElementById('option_'+i).children[0];
                        domElement.className = "Choice__options--option-emoji";
                    }
                }
                // Display feedback for user based on their choice
                this.displayMessage(feedbackMessages[choiceMade][Math.floor(Math.random() * feedbackMessages[choiceMade].length)], choiceMade, 2000);
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

                if(this.state.helpCountUsed) {
                    this.setState({helpCountUsed: false});
                }
            } else {
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
                    ? <Choice elements={this.state.choiceElements} day={this.state.day} handleElementClick={this.handleElementClick} handleHelpClick={this.handleHelpCLick} handleKeyPressed={this.handleKeyPressed} />
                    : <Interlude title={this.state.eventElement.title} details={this.state.eventElement.details}/>
                }
                {this.state.message.data !== "" &&
                    <div className={`Story__message Story__message--${this.state.message.state}`} id="story-message"><p>{this.state.message.data}</p></div>
                }
                {(!this.state.renderChoice && this.state.eventsIndex === 3)
                    ? <button className="Story__btn" onClick={() => window.location.reload()}><span>Play again</span><i className="material-icons">arrow_forward</i></button>
                    : <button className="Story__btn" onClick={(e) => this.handleBtnClick(e)} disabled={!this.state.selectionMade && this.state.renderChoice}><span>Next</span><i className="material-icons">arrow_forward</i></button>
                }
            </div>
        )
    }
}

export default Story;