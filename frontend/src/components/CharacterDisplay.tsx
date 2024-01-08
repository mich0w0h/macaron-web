import React, { useState, useEffect, useRef } from 'react';
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
    
    const timeoutIdRef = useRef<number | null>(null); // for clearTimeout
    
    const blinkWithTimer = async (timer: number): Promise<void> => {
        console.log('called blinkWithTimer');
        const interval = 1500;
        await blinkEyes(1); // One blink
        await delay(interval); // Delay after one blink
        await blinkEyes(2); // Two blinks
        await delay(interval); // Delay after two blinks
        await blinkEyes(1); // One final blink
        timeoutIdRef.current = setTimeout(() => {
            blinkWithTimer(timer);
        }, timer) as number;
        console.log('create timeout:' + timeoutIdRef.current);
    }

    const hasMounted = useRef<boolean>(false);
    useEffect(() => {
        if(!hasMounted.current) {
            hasMounted.current =true;
            blinkWithTimer(3000);
        }
    
        return () => {
            if (timeoutIdRef.current) {
                console.log('clear timeout:' + timeoutIdRef.current);
                clearTimeout(timeoutIdRef.current);
            }
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
