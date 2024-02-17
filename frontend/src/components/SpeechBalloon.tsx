import React, { useEffect, useState } from "react";
import "./SpeechBalloon.css";

interface SpeechBalloonProps {
  message: string;
  isVisible: boolean;
  onHide: () => void; // Callback to notify App when the balloon should hide
}

const SpeechBalloon: React.FC<SpeechBalloonProps> = ({
  message,
  isVisible,
  onHide,
}) => {
  const [fontSize, setFontSize] = useState("1vw");

  useEffect(() => {
    if (isVisible) {
      const hideTimeout = setTimeout(() => {
        onHide(); // Notify App to hide the balloon
      }, 2000);

      return () => {
        clearTimeout(hideTimeout);
      };
    }
  }, [isVisible, onHide]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    if (message.length <= 5) {
      setFontSize(isMobile ? "5vw" : "1.1vw");
    } else if (message.length <= 15) {
      setFontSize(isMobile ? "4vw" : "1vw");
    } else {
      setFontSize(isMobile ? "3vw" : "0.9vw");
    }
  }, [message]);

  return (
    <div
      className={`speech-balloon ${isVisible ? "" : "hidden"}`}
      style={{ fontSize }}
    >
      {message}
    </div>
  );
};

export default SpeechBalloon;
