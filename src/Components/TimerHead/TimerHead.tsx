import { Dispatch, useState } from "react";
import { css } from "@emotion/react";
import { BellSetter, ModeSelector, TimerController } from "../index";
import { isMmssFormat, isNumber, timeStringToNumber } from "../utils";
// import { SoundSelector } from "../SoundSelector";

interface Props {
  isRunning: boolean;
  currentSeconds: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  bellTimes: number[];
  setBellTime: (newBellTime: number[]) => void;
  bellType: string;
  setBellType: Dispatch<React.SetStateAction<string>>;
  setPreset: (preset: "short" | "long") => void;
}

const TimerHead = ({
  isRunning,
  currentSeconds,
  startTimer,
  pauseTimer,
  resetTimer,
  bellTimes,
  setBellTime,
  // bellType,
  // setBellType,
  setPreset,
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
      <div
        css={css({
          borderLeft: "1px solid #333",
          height: "100%",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          justifyContent: "center",
        })}
      >
        <BellSetter
          bellTimes={bellTimes}
          currentBellInput={currentBellInput}
          handleOnFocus={handleOnFocus}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <div css={css({ display: "flex", gap: "8px", alignItems: "center" })}>
          発表時間：
          <button css={buttonStyle} onClick={() => setPreset("long")}>
            20分
          </button>
          <button css={buttonStyle} onClick={() => setPreset("short")}>
            10分
          </button>
        </div>
      </div>
      {/* <SoundSelector bellType={bellType} setBellType={setBellType} /> */}
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

const buttonStyle = css({
  all: "unset",
  borderRadius: "8px",
  background: "#333",
  color: "#EEE",
  textAlign: "center",
  padding: "2px 6px",
  minWidth: "16px",
  minHeight: "16px",
  fontSize: "1rem",
  width: "120px",
  height: "28px",

  "&:hover": {
    opacity: "0.8",
    cursor: "pointer",
  },

  "&:disabled": {
    opacity: 1,
    background: "#BBB",
    cursor: "default",
  },
});

export default TimerHead;
