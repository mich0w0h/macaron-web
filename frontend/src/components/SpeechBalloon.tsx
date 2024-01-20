import React, { useEffect } from 'react';
import './SpeechBalloon.css';

interface SpeechBalloonProps {
  message: string;
  isVisible: boolean;
  onHide: () => void; // Callback to notify App when the balloon should hide
}

const SpeechBalloon: React.FC<SpeechBalloonProps> = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const hideTimeout = setTimeout(() => {
        onHide(); // Notify App to hide the balloon
      }, 2000);

      return () => clearTimeout(hideTimeout);
    }
  }, [isVisible, onHide]);

  return <div className={`speech-balloon ${isVisible ? '' : 'hidden'}`}>{message}</div>;
};

export default SpeechBalloon;
