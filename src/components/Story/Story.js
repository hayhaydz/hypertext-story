import React from 'react';
import axios from 'axios';
import './Story.scss';

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
            eventElement: []
        };

        this.handleElementClick = this.handleElementClick.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
    }

    componentDidMount = () => {
        // Fetch choices
        axios.get('./data_choices.json').then(res => {
            const choices = res.data.choices;
            // console.log(choices);
            this.setState({ choices });

            this.setState({choiceElements: this.state.choices[0]});

            let choiceElementsD = this.shuffleArray(this.state.choiceElements);
            this.setState({choiceElements: choiceElementsD});
        })

        axios.get('./data_events.json').then(res => {
            const events = res.data.events;
            
            this.setState({events});
            this.setState({eventElement: this.state.events[this.state.eventsIndex][1]});
        })
    }

    componentDidUpdate() {
        console.log('Current Score: ' + this.state.score);

        if(this.state.score >= (this.state.day - 1) * 5) {
            // Doing good
            console.log('Doing good.');
            // let eventsD = this.state.events;
            // console.log(eventsD[this.state.eventsIndex][0]);
            // let eventElementD = eventsD[this.state.eventsIndex][0];
            // this.setState({eventElement: eventElementD});
            // this.setState({eventsIndex: this.state.eventsIndex + 1});
        } else if (this.state.score >= (this.state.day - 1) * 1) {
            // Doing okay
            console.log('Doing Okay');
            // let eventsD = this.state.events;
            // let eventElementD = eventsD[this.state.eventsIndex][1];
            // this.setState({eventElement: eventElementD});
            // this.setState({eventsIndex: this.state.eventsIndex + 1});
        } else if(this.state.score <= 0) {
            // Doing bad
            console.log('Doing bad');
            // let eventsD = this.state.events;
            // let eventElementD = eventsD[this.state.eventsIndex][2];
            // this.setState({eventElement: eventElementD});
            // this.setState({eventsIndex: this.state.eventsIndex + 1});
        }
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
        event.preventDefault();
        let selectedOption = document.getElementById('option_' + index);
        selectedOption.classList.add('Story__options--option-selected');
        this.setState({selectionMade: true});

        let choiceElementsD = this.state.choiceElements;
        for (let i = 0; i < choiceElementsD.length; i++) {
            if(choiceElementsD[i].id !== index) {
                if(choiceElementsD[i].selected) {
                    let element = this.state.choiceElements[i];
                    let removeClassOption = document.getElementById('option_' + element.id);
                    removeClassOption.classList.remove('Story__options--option-selected');
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
        if (this.state.day !== 1 && this.state.day - 1 % 5 !== 0) {
            let resetElement = document.getElementsByClassName('Story__options--option-selected');
            resetElement[0].classList.remove('Story__options--option-selected');
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
            this.setState({day: this.state.day + 1});
            this.setState({choicesIndex: this.state.choicesIndex + 1}, () => {
                let choiceElementsD = this.shuffleArray(this.state.choices[this.state.choicesIndex]);
                this.setState({choiceElements: choiceElementsD});
            });
        }
    }
    
    render = () => {
        if(this.state.day !== 1 && this.state.day - 1 % 5 !== 0) {
            return (
                <div className="Story">
                    <h1 className="Story__title">Day {this.state.day}</h1>
                    <div className="Story__options">
                        {this.state.choiceElements.map((el => (
                                <div className="Story__options--option" key={el.id} onClick={this.handleElementClick(el.id)} id={`option_${el.id}`}>
                                    <div className="Story__options--option-emoji">
                                    <span
                                        role="img"
                                        aria-label="Mushroom"
                                        // aria-hidden="Mushroom"
                                    >
                                        {el.emoji}
                                    </span>
                                    </div>
                                    <p className="Story__options--option-name">{el.value}</p>
                                </div>
                            )
                        ))}
                    </div>
                    <button className="Story__btn" onClick={(e) => this.handleBtnClick(e)} disabled={!this.state.selectionMade}>
                        <span>Next</span> 
                        <i className="material-icons">arrow_forward</i>
                    </button>
                </div>
            )
        } else {
            return (
                <div className="Story">
                    <div className="Story__update">
                        <h1 className="Story__update--title">{this.state.eventElement.name}</h1>
                        <p className="Story__update--text">{this.state.eventElement.details}</p>
                    </div>
                    <button className="Story__btn" onClick={(e) => this.handleBtnClick(e)} disabled={!this.state.selectionMade}>
                        <span>Next</span> 
                        <i className="material-icons">arrow_forward</i>
                    </button>
                </div>
            )
        }
    }
}

export default Story;