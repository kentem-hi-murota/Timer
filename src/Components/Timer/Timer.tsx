import { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";
import { TimerHead, TimerMain } from "../index";
import { bellPlay, bellTypes, timeStringToNumber } from "../utils";

const PRESET = {
  short: { time: 600, bellTimes: [300, 60] },
  long: { time: 1200, bellTimes: [600, 300, 60, 0] },
};

const Timer = () => {
  const initialTime = 1200;
  const [bellTimes, setBellTimes] = useState<number[]>([600, 300, 60, 0]);
  const [currentSeconds, setCurrentSeconds] = useState<number>(initialTime);
  const [bellType, setBellType] = useState(bellTypes[0]);
  const [isNotify, setIsNotify] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const timerHandler = () => {
      bellPlay(bellType);
      setIsNotify(true);
      setTimeout(() => {
        setIsNotify(false);
      }, 500);
    };

    if (isRunning) {
      if (bellTimes.includes(currentSeconds)) {
        timerHandler();
      }
      if (!currentSeconds) setIsRunning(false);
      if (currentSeconds > 0) {
        const timeoutId = setTimeout(
          () => setCurrentSeconds((prev) => prev - 1),
          1000
        );
        return () => clearTimeout(timeoutId);
      }
    }
  }, [currentSeconds, isRunning, bellTimes, bellType]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setCurrentSeconds(initialTime);
  };

  const setTime = (inputTime: string): void => {
    const inputSeconds: number = timeStringToNumber(inputTime);
    if (inputSeconds < 0) return;
    setCurrentSeconds(inputSeconds);
  };

  const setBellTime = (newBellTimes: number[]): void =>
    setBellTimes([...newBellTimes]);

  const setPreset = (preset: "short" | "long") => {
    resetTimer();
    setCurrentSeconds(PRESET[preset].time);
    setBellTimes(PRESET[preset].bellTimes);
  };

  return (
    <>
      {isNotify && <div css={notifyStyle}></div>}
      <TimerHead
        isRunning={isRunning}
        currentSeconds={currentSeconds}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        bellTimes={bellTimes}
        setBellTime={setBellTime}
        bellType={bellType}
        setBellType={setBellType}
        setPreset={setPreset}
      />
      <TimerMain
        setTime={setTime}
        currentSeconds={currentSeconds}
        isRunning={isRunning}
      />
    </>
  );
};

const blink = keyframes({
  "0%": { opacity: 0.8 },
  "100%": { opacity: 0 },
});

const notifyStyle = css({
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  background: "#000",
  animationName: blink,
  animationDuration: "0.3s",
  animationFillMode: "forwards",
  animationIterationCount: 2,
});

export default Timer;
