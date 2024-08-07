import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Input, SetTimeModal } from "../index";
import { isMmssFormat, isNumber, timeNumberToString } from "../utils";

interface Props {
  setTime: (inputTime: string) => void;
  currentSeconds: number;
  isRunning: boolean;
}

const TimerMain = ({ setTime, currentSeconds, isRunning }: Props) => {
  const [title, setTitle] = useState<string>("timer");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openInputModal = () => setIsModalOpen(true);
  const closeInputModal = () => setIsModalOpen(false);

  const [modalInput, setModalInput] = useState<string>(
    timeNumberToString(currentSeconds)
  );
  const [isOK, setIsOK] = useState<boolean>(false);

  useEffect(() => {
    if (isOK) {
      const input: HTMLInputElement | null =
        document.querySelector("#inputTime");
      const inputTime: string = input?.value ?? "";
      setTime(inputTime);
      setIsOK(false);
      closeInputModal();
    }
  }, [isOK, setTime]);

  const modalChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputText: string = event.target.value;
    if (isMmssFormat(inputText) || isNumber(inputText) || !inputText) {
      setModalInput(inputText);
    }
  };

  const setCurrentSecondsToModalInput = (): void =>
    setModalInput(timeNumberToString(currentSeconds));

  return (
    <>
      <main css={mainStyle}>
        <Input
          type="text"
          name="title"
          value={title}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          styles={titleStyle}
        />
        <p onClick={!isRunning ? openInputModal : () => {}} css={timeStyle}>
          {timeNumberToString(currentSeconds)}
        </p>
      </main>
      {isModalOpen && (
        <SetTimeModal
          modalInput={modalInput}
          initModalInput={setCurrentSecondsToModalInput}
          modalChangeHandler={modalChangeHandler}
          okButtonHandler={() => setIsOK(true)}
          closeInputModal={closeInputModal}
        />
      )}
    </>
  );
};

const mainStyle = css({
  height: "85vh",
  textAlign: "center",
  background: "white",
});

const titleStyle = css({
  border: "none",
  fontSize: "80px",
  textAlign: "center",
  margin: "24px 0",
  width: "100%",
  color: "#333",
});

const timeStyle = css({
  display: "inline-block",
  fontSize: "30vw",
  textAlign: "center",
  lineHeight: "1",
  userSelect: "none",
  margin: "0",
  overflow: "hidden",
});

export default TimerMain;
