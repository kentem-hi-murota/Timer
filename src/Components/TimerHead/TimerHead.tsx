import { useState } from "react";
import { css } from "@emotion/react";
import { BellSetter, ModeSelector, TimerController } from "../index";
import { isMmssFormat, isNumber, timeStringToNumber } from "../utils";
import { SoundSelector } from "../SoundSelector";

interface Props {
  isRunning: boolean;
  currentSeconds: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  bellTimes: number[];
  setBellTime: (newBellTime: number[]) => void;
}

const TimerHead = ({
  isRunning,
  currentSeconds,
  startTimer,
  pauseTimer,
  resetTimer,
  bellTimes,
  setBellTime,
}: Props) => {
  /// 入力中のベル時間のフォーム情報
  const [currentBellInput, setCurrentBellInput] = useState<{
    index: number;
    time: string;
  }>();

  /// 2-2値の更新があった時に全体も更新 →blurしたとき
  // useEffect(() => {}, [currentBellInput]);

  /// 1 focusが当たった時に現在値をセット
  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    const inputText: string = event.target.value;
    const inputOrder: number = Number(event.target.name.charAt(0)) - 1;
    setCurrentBellInput({ index: inputOrder, time: inputText });
  };

  /// 2-1 変更時にバリデーションして更新
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputText: string = event.target.value;
    const inputOrder: number = Number(event.target.name.charAt(0)) - 1;
    if (isMmssFormat(inputText) || isNumber(inputText) || !inputText) {
      setCurrentBellInput({ index: inputOrder, time: inputText });
    }
  };

  /// 3 フォーカスが外れて値が確定したらソートして更新
  const handleBlur = () => {
    if (currentBellInput) {
      const inputNumberBell: number = timeStringToNumber(currentBellInput.time);
      const newBellTimes = bellTimes.map((bellTime, index) =>
        index === currentBellInput.index ? inputNumberBell : bellTime
      );
      setBellTime(newBellTimes.sort((a, b) => b - a));
      setCurrentBellInput({ index: -1, time: "" });
    }
  };

  return (
    <header css={headerStyle}>
      <ModeSelector />
      <TimerController
        isRunning={isRunning}
        currentSeconds={currentSeconds}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />
      <BellSetter
        bellTimes={bellTimes}
        currentBellInput={currentBellInput}
        handleOnFocus={handleOnFocus}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <SoundSelector />
    </header>
  );
};

const headerStyle = css({
  background: "#FDD000",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  height: "15vh",
});

export default TimerHead;
