import React from 'react';

class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emoji: {
                value: 'food',
                label: 'food'
            }
        };
    }

    render() {
        let symbols = [];

        let symbol = {
            emoji: '🍝',
            label: 'Pasta'
        };
        symbols.push(symbol);
        symbol = {
            emoji: '🍽️',
            label: 'Knife and Fork with Plate'
        };
        symbols.push(symbol);
        symbol = {
            emoji: '🍻',
            label: 'Clinking beer mugs'
        };
        symbols.push(symbol);
        symbol = {
            emoji: '🍟',
            label: 'French fries'
        };
        symbols.push(symbol);

        return (
            <div>
                <span
                    className="App__right--emoji"
                    role="img"
                    aria-label={this.emoji.label}
                    aria-hidden={this.emoji.label}
                >
                    {this.emoji.value}
                </span>
            </div>
        )
    }
}

export default Emoji;