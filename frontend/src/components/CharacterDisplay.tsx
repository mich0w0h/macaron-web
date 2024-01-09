import React from 'react';
import CharacterEar from './CharacterEar';
import CharacterFace from './CharacterFace';
import './CharacterDisplay.css';

const CharacterDisplay: React.FC = () => {
    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    return (
        <div className="character">
            <img src="/src/assets/character-body.png" alt="Character body" className="character-body" />

            <CharacterEar side="left" delayFunction={delay} />
            <CharacterEar side="right" delayFunction={delay} />

            <CharacterFace delayFunction={delay} />
        </div>
    );
};

export default CharacterDisplay;
