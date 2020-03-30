import React from 'react';
import './Story.scss';

class Story extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: 1,
            selectionMade: false,
            elements: [
                {id: 0, value: 'Pear', emoji: '🍐', selected: false, quality: 'good'},
                {id: 1, value: 'Apple', emoji: '🍎', selected: false, quality: 'okay'},
                {id: 2, value: 'Banana', emoji: '🍌', selected: false, quality: 'bad'},
            ]
        };
        this.handleElementClick = this.handleElementClick.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);

    }

    handleElementClick = index => event => {
        event.preventDefault();
        let selectedOption = document.getElementById('option_' + index);
        selectedOption.classList.add('Story__options--option-selected');
        this.setState({selectionMade: true});

        let elementsDUP = this.state.elements;
        for (let i = 0; i < elementsDUP.length; i++) {
            if(elementsDUP[i].id !== index) {
                if(elementsDUP[i].selected) {
                    let element = this.state.elements[i];
                    let removeClassOption = document.getElementById('option_' + element.id);
                    removeClassOption.classList.remove('Story__options--option-selected');
                    elementsDUP[i].selected = false;
                }
            } else {
                elementsDUP[i].selected = true;
            }
        }

        this.setState({elements: elementsDUP});
    }

    handleBtnClick = e => {
        e.preventDefault();
        this.setState({day: this.state.day + 1});
        console.log('hello');
    }

    componentDidMount = () => {
        // https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
        let shuffle = array => {
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
        };

        let elementsDUP = shuffle(this.state.elements);
        this.setState({elements: elementsDUP});
    }
    
    render = () => {

        return (
            <div className="Story">
                <h1 className="Story__title">Day {this.state.day}</h1>
                <div className="Story__options">
                    {this.state.elements.map((el => (
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
    }
}

export default Story;