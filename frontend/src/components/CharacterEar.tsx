import React, { useState, useEffect } from 'react';
import './CharacterEar.css';

interface CharacterEarProps {
    side: 'left' | 'right';
    delayFunction: (ms: number) => Promise<void>;
}

const CharacterEar: React.FC<CharacterEarProps> = ({ side, delayFunction }) => {
    const [twitching, setTwitching] = useState(false);
    const twitchDuration: number = 150;

    useEffect(() => {
        const twitchInterval = setInterval(() => {
            twitchEars();
        }, 3000); // Interval between twitches

        return () => clearInterval(twitchInterval);
    }, []);

    const twitchEars = async () => {
        setTwitching(true);

        await delayFunction(twitchDuration);
        setTwitching(false);

        await delayFunction(200); // Delay between the twitches

        setTwitching(true);
        await delayFunction(twitchDuration);

        setTwitching(false);
    };

    return (
        <img
            src={`/src/assets/character-${side}-ear.png`}
            alt={`${side} ear`}
            className={`ear ear-${side} ${twitching ? 'twitch-' + side : ''}`}
        />
    );
};

export default CharacterEar;
