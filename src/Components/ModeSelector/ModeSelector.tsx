import { css } from "@emotion/react";
import { Input } from "../index";

const ModeSelector = () => {
  return (
    <div css={modeAreaStyle}>
      <Input
        type="radio"
        name="timerSetting"
        label="CountDown"
        checked={true}
      />
      {/* <Input type='radio' name='timerSetting' label='CountUp' /> */}
    </div>
  );
};

const modeAreaStyle = css({
  minWidth: "120px",
});

export default ModeSelector;
