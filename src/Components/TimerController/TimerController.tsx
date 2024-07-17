import { css } from "@emotion/react";

interface Props {
  isRunning: boolean;
  currentSeconds: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const TimerController = ({
  isRunning,
  currentSeconds,
  startTimer,
  pauseTimer,
  resetTimer,
}: Props) => {
  return (
    <div css={controlAreaStyle}>
      {isRunning ? (
        <button onClick={pauseTimer} css={buttonStyle}>
          ❙❙ ポーズ
        </button>
      ) : (
        <button
          onClick={startTimer}
          css={buttonStyle}
          disabled={!currentSeconds}
        >
          ▶ スタート
        </button>
      )}
      <button onClick={resetTimer} css={buttonStyle}>
        ■ リセット
      </button>
    </div>
  );
};

const controlAreaStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "4px",
  borderLeft: "1px solid #333",
  padding: "0 0 0 16px",
  height: "100%",
  minWidth: "120px",
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
export default TimerController;
