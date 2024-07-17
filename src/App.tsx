import { css, Global } from "@emotion/react";
import { Timer } from "./Components";

const App = () => {
  return (
    <>
      <Global styles={bodyStyle} />
      <Timer />
    </>
  );
};

const bodyStyle = css({
  body: {
    margin: 0,
  },

  "*": {
    boxSizing: "border-box",
  },
});

export default App;

