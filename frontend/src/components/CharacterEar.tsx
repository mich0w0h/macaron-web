import React, { useEffect, useState } from "react";
import "./CharacterEar.css";
import leftEarImg from "../assets/character-left-ear.png";
import rightEarImg from "../assets/character-right-ear.png";

interface CharacterEarProps {
  side: "left" | "right";
  delayFunction: (ms: number) => Promise<void>;
}

const CharacterEar: React.FC<CharacterEarProps> = ({ side, delayFunction }) => {
  const [twitching, setTwitching] = useState(false);
  const twitchDuration: number = 150;

  useEffect(() => {
    const twitchInterval = setInterval(() => {
      twitchEars().catch(console.error);
    }, 3000); // Interval between twitches

    return () => {
      clearInterval(twitchInterval);
    };
  }, []);

  const twitchEars = async (): Promise<void> => {
    setTwitching(true);

    await delayFunction(twitchDuration);
    setTwitching(false);

    await delayFunction(200); // Delay between the twitches

    setTwitching(true);
    await delayFunction(twitchDuration);

    setTwitching(false);
  };

  const earImage = side === "left" ? leftEarImg : rightEarImg;

  return (
    <img
      src={earImage}
      alt={`${side} ear`}
      className={`ear ear-${side} ${twitching ? "twitch-" + side : ""}`}
    />
  );
};

export default CharacterEar;
