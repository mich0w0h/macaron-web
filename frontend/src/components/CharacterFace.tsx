import React, { useEffect, useRef, useState } from "react";
import "./CharacterFace.css";
import characterEyeBlinkImg from "../assets/character-eye-blink.png";
import characterEyeDefaultImg from "../assets/character-eye-default.png";
import characterWhiskersLeftImg from "../assets/character-whiskers-left.png";
import characterWhiskersRightImg from "../assets/character-whiskers-right.png";
import characterMouseImg from "../assets/character-mouse.png";

interface CharacterFaceProps {
  delayFunction: (ms: number) => Promise<void>;
}

const CharacterFace: React.FC<CharacterFaceProps> = ({ delayFunction }) => {
  const [blinking, setBlinking] = useState(false);

  const blinkEyes = async (blinkCount: number): Promise<void> => {
    const duration: number = 130;
    for (let i = 0; i < blinkCount; i++) {
      setBlinking(true);
      await delayFunction(duration);
      setBlinking(false);
      await delayFunction(duration);
    }
  };

  const blinkWithTimer = async (timer: number): Promise<void> => {
    console.log("start blinkWithTimer: " + timer);
    const interval = 1500;
    await blinkEyes(1); // One blink
    await delayFunction(interval); // Delay after one blink
    await blinkEyes(2); // Two blinks
    await delayFunction(interval); // Delay after two blinks
    await blinkEyes(1); // One final blink

    console.log("set next blinkWithTimer");
    setTimeout(() => {
      blinkWithTimer(timer).catch(console.error);
    }, timer);
  };

  const hasMounted = useRef<boolean>(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      console.log("initialize");
      blinkWithTimer(3000).catch(console.error);
    }

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return (
    <div>
      <div className="character-eyes">
        <img
          src={blinking ? characterEyeBlinkImg : characterEyeDefaultImg}
          alt="Character Left eye"
          className={blinking ? "character-eye-blink" : "character-eye-default"}
        />
        <img
          src={blinking ? characterEyeBlinkImg : characterEyeDefaultImg}
          alt="Character Right eye"
          className={blinking ? "character-eye-blink" : "character-eye-default"}
        />
      </div>
      <div className="character-whiskers">
        <img
          src={characterWhiskersLeftImg}
          alt="Character Left Whiskers"
          className="character-whiskers-left twitch-whiskers-left"
        />
        <img
          src={characterWhiskersRightImg}
          alt="Character Right Whiskers"
          className="character-whiskers-right twitch-whiskers-right"
        />
      </div>
      <img
        src={characterMouseImg}
        alt="Character Mouse"
        className="character-mouse"
      />
    </div>
  );
};

export default CharacterFace;
