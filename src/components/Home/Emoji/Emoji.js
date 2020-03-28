import React from 'react';

const Emoji = () => {
    const [count, setCount] = React.useState(0);

    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();

    const animate = time => {
        if(previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            setCount(prevCount => (prevCount + deltaTime * 0.002)  % 3);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
        // eslint-disable-next-line
    }, []);
    

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
        <div className="Home__right--emoji">
            <span
                role="img"
                aria-label={symbols[Math.round(count)].label}
                aria-hidden={symbols[Math.round(count)].label}
            >
                {symbols[Math.round(count)].emoji}
            </span>
        </div>
    )
}

export default Emoji;