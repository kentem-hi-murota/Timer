import { useEffect, useState } from 'react';
import { TimerHead, TimerMain } from '../index';
import { bellPlay, timeStringToNumber } from '../utils';

const Timer = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentSeconds, setCurrentSeconds] = useState<number>(30);
  const [bellTimes, setBellTimes] = useState<number[]>([...Array(5)].map(() => 0));

  useEffect(() => {
    if (isRunning) {
      if (bellTimes.includes(currentSeconds) || !currentSeconds) bellPlay();
      if (!currentSeconds) setIsRunning(false);
      if (currentSeconds > 0) {
        const timeoutId = setTimeout(() => setCurrentSeconds((prev) => prev - 1), 1000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [currentSeconds, isRunning, bellTimes]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setCurrentSeconds(0);
  };

  const setTime = (inputTime: string): void => {
    const inputSeconds: number = timeStringToNumber(inputTime);
    if (inputSeconds < 0) return;
    setCurrentSeconds(inputSeconds);
  };

  const setBellTime = (newBellTimes: number[]): void => {
    setBellTimes([...newBellTimes]);
  };

  return (
    <div>
      <TimerHead
        isRunning={isRunning}
        currentSeconds={currentSeconds}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        bellTimes={bellTimes}
        setBellTime={setBellTime}
      />
      <TimerMain setTime={setTime} currentSeconds={currentSeconds} isRunning={isRunning} />
    </div>
  );
};

export default Timer;
