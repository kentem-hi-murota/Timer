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
  position: "fixed",
  inset: "0",
  background: "rgba(0,0,0,0.6)",
});

const modalContentStyle = css({
  position: "fixed",
  top: "15%",
  insetInline: "25%",
  width: "50%",
  background: "white",
  borderRadius: "16px",
  padding: "16px",
});

export default Modal;
