import { useState } from "react";

function useSpeechBalloon(): {
  isVisible: boolean;
  showBalloon: () => void;
  hideBalloon: () => void;
} {
  const [isVisible, setIsVisible] = useState(false);

  const showBalloon = (): void => {
    setIsVisible(true);
  };
  const hideBalloon = (): void => {
    setIsVisible(false);
  };

  return { isVisible, showBalloon, hideBalloon };
}

export default useSpeechBalloon;
