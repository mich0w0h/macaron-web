import React from "react";
import CharacterEar from "./CharacterEar";
import CharacterFace from "./CharacterFace";
import "./CharacterDisplay.css";
import CharacterBodyImg from "../assets/character-body.png";

const CharacterDisplay: React.FC = () => {
  return (
    <div className="character">
      <img
        src={CharacterBodyImg}
        alt="Character body"
        className="character-body"
      />

      <CharacterEar side="left" />
      <CharacterEar side="right" />

      <CharacterFace />
    </div>
  );
};

export default CharacterDisplay;
