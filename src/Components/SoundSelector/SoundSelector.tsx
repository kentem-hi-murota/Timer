import { css } from "@emotion/react";
import { bellPlay } from "../utils";

const SoundSelector = () => {
  return (
    <div css={soundSelectorStyle}>
      <label>
        音声を選択：
        <select>
          <option value="">はと</option>
          <option value="">ドラム缶</option>
          <option value="">チン</option>
          <option value="">ねこ</option>
          <option value="">爆発1</option>
          <option value="">爆発2</option>
        </select>
      </label>
      <button onClick={bellPlay} css={bellPlayButtonStyle}>
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
  border: "1px solid black",
});

export default SoundSelector;
