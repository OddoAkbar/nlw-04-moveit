import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  time: number;
  startCountdown: () => void;
  resetCoutdown: () => void;
};

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;
export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, sethHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  };

  function resetCoutdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
    sethHasFinished(false);
  };

  useEffect(() => {
    if (isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      },1000);
    } else if (isActive && time === 0) {
      sethHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider 
      value={{
        time,
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCoutdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
};