import React from "react";
import ReactDOM from "react-dom/client";

const tab = () => {
  return (
    <>
      <h3>タブ</h3>
    </>
  );
};

export default tab;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(tab));
