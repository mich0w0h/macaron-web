import React, { useState, useEffect } from 'react';
import CharacterEar from './CharacterEar';
import './CharacterDisplay.css';

const CharacterDisplay: React.FC = () => {
    const [blinking, setBlinking] = useState(false);
    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const blinkEyes = async (blinkCount: number): Promise<void> => {
        const duration: number = 130;
        for (let i = 0; i < blinkCount; i++) {
            setBlinking(true);
            await delay(duration);
            setBlinking(false);
            await delay(duration);
        }
    }
    
    let timeoutId: number; // for clearTimeout
    
    const blinkWithTimer = async (timer: number): Promise<void> => {
        const interval = 1500;
        await blinkEyes(1); // One blink
        await delay(interval); // Delay after one blink
        await blinkEyes(2); // Two blinks
        await delay(interval); // Delay after two blinks
        await blinkEyes(1); // One final blink
        timeoutId = setTimeout(() => {
            blinkWithTimer(timer);
        }, timer);
    }

    useEffect(() => {
        blinkWithTimer(3000);
    
        return () => {
            clearTimeout(timeoutId); 
        };
    }, []);
    

    return (
        <div className="character">
            <img src="/src/assets/character-body.png" alt="Character body" className="character-body" />

            <CharacterEar side="left" delayFunction={delay} />
            <CharacterEar side="right" delayFunction={delay} />

            <div className="character-eyes">
                <img
                    src={blinking ? "/src/assets/character-eye-blink.png" : "/src/assets/character-eye-default.png"}
                    alt="Character Left eye"
                    className={blinking ? "character-eye-blink" : "character-eye-default"} 
                />
                <img
                    src={blinking ? "/src/assets/character-eye-blink.png" : "/src/assets/character-eye-default.png"}
                    alt="Character Right eye"
                    className={blinking ? "character-eye-blink" : "character-eye-default"} 
                />
            </div>
        </div>
    );
};

export default CharacterDisplay;
