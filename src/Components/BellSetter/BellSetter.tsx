import { css } from '@emotion/react';
import { Input } from '../index';
import { timeNumberToString } from '../utils';

interface Props {
  bellTimes: number[];
  currentBellInput?: {
    index: number;
    time: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const BellSetter = ({ bellTimes, currentBellInput, handleOnFocus, handleChange, handleBlur }: Props) => {
  const ordinalNumber: string[] = ['1st', '2nd', '3rd', '4th', '5th'];
  return (
    <div css={bellAreaStyle}>
      <div>
        <span>Bells:</span>
        {/* <br />
          <button css={buttonStyle}>-</button>
          <button css={buttonStyle}>+</button> */}
      </div>
      <div css={bellInputAreaStyle}>
        {bellTimes.map((bellTime, index) => {
          return (
            <Input
              key={ordinalNumber[index] + 'BellInput'}
              type="text"
              name={ordinalNumber[index]}
              value={index === currentBellInput?.index ? currentBellInput.time : timeNumberToString(bellTime)}
              label={ordinalNumber[index] + ':'}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleOnFocus={handleOnFocus}
              styles={bellInputStyle}
            />
          );
        })}
      </div>
    </div>
  );
};
const bellAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  gap: '8px',
  borderLeft: '1px solid #333',
  padding: '0 8px',
  height: '100%',
  fontSize: '20px',
});

const bellInputAreaStyle = css({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
});

const bellInputStyle = css({
  width: '48px',
});

export default BellSetter;
