import { css } from '@emotion/react';
import { Modal, Input } from '../index';
import { useEffect } from 'react';

interface Props {
  modalInput: string;
  initModalInput: () => void;
  modalChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  okButtonHandler: () => void;
  closeInputModal: () => void;
}

const SetTimeModal = ({ modalInput, initModalInput, modalChangeHandler, okButtonHandler, closeInputModal }: Props) => {
  useEffect(() => {
    initModalInput();
  }, []);

  return (
    <Modal>
      <h2 css={h2Style}>タイマーの時間を入力</h2>
      <p css={paragraphStyle}>形式：'分:秒' または 秒数</p>
      <Input
        name="time"
        type="text"
        value={modalInput}
        label="時間 : "
        handleChange={modalChangeHandler}
        id="inputTime"
        styles={inputStyle}
      />
      <div css={buttonAreaStyle}>
        <button onClick={okButtonHandler} css={buttonStyle}>
          OK
        </button>
        <button onClick={closeInputModal} css={buttonStyle}>
          キャンセル
        </button>
      </div>
    </Modal>
  );
};

const h2Style = css({
  margin: '0',
});

const paragraphStyle = css({
  margin: '8px 0 0 0',
});

const inputStyle = css({
  marginTop: '8px',
});

const buttonAreaStyle = css({
  textAlign: 'right',
  marginTop: '8px',
});

const buttonStyle = css({
  all: 'unset',
  borderRadius: '8px',
  background: '#333',
  color: '#EEE',
  textAlign: 'center',
  padding: '4px 12px',
  margin: '0 8px',

  '&:hover': {
    opacity: '0.8',
    cursor: 'pointer',
  },
});
export default SetTimeModal;
