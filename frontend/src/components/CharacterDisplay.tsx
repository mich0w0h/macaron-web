import React from "react";
import CharacterEar from "./CharacterEar";
import CharacterFace from "./CharacterFace";
import "./CharacterDisplay.css";
import CharacterBodyImg from "../assets/character-body.png";

const CharacterDisplay: React.FC = () => {
  const delay = async (ms: number): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, ms));
  };

  return (
    <div className="character">
      <img
        src={CharacterBodyImg}
        alt="Character body"
        className="character-body"
      />

      <CharacterEar side="left" delayFunction={delay} />
      <CharacterEar side="right" delayFunction={delay} />

      <CharacterFace delayFunction={delay} />
    </div>
  );
};

export default CharacterDisplay;
