import { css } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <div css={modalStyle}>
      <div css={modalContentStyle}>{children}</div>
    </div>
  );
};

const modalStyle = css({
  position: "absolute",
  top: "0",
  right: "0",
  left: "0",
  bottom: "0",
  background: "rgba(0,0,0,0.6)",
});

const modalContentStyle = css({
  position: "absolute",
  top: "12%",
  right: "25%",
  left: "25%",
  width: "50%",
  background: "white",
  borderRadius: "16px",
  padding: "16px",
});

export default Modal;
