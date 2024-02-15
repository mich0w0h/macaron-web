import React, { useEffect, useState } from "react";
import "./CharacterEar.css";
import leftEarImg from "../assets/character-left-ear.png";
import rightEarImg from "../assets/character-right-ear.png";
import { delay } from "../delay";

interface CharacterEarProps {
  side: "left" | "right";
}

const CharacterEar: React.FC<CharacterEarProps> = ({ side }) => {
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

    await delay(twitchDuration);
    setTwitching(false);

    await delay(200); // Delay between the twitches

    setTwitching(true);
    await delay(twitchDuration);

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
