import { css } from "@emotion/react";
import { bellPlay, bellTypes } from "../utils";
import { Dispatch } from "react";

interface SoundSelectorProps {
  bellType: string;
  setBellType: Dispatch<React.SetStateAction<string>>;
}

const SoundSelector = ({ bellType, setBellType }: SoundSelectorProps) => {
  return (
    <div css={soundSelectorStyle}>
      <label>
        音声を選択：
        <select value={bellType} onChange={(e) => setBellType(e.target.value)}>
          {bellTypes.map((bellType) => (
            <option value={bellType}>{bellType}</option>
          ))}
        </select>
      </label>
      <button onClick={() => bellPlay(bellType)} css={bellPlayButtonStyle}>
        ベル再生
      </button>
    </div>
  );
};

const soundSelectorStyle = css({
  display: "flex",
  flexDirection: "column",
  textWrap: "nowrap",
  gap: "4px",
});

const bellPlayButtonStyle = css({
  borderRadius: "8px",
  width: "50%",
  color: "white",
  backgroundColor: "#333",
  border: "none",
  ":hover": { cursor: "pointer", opacity: "0.7" },
});

export default SoundSelector;
