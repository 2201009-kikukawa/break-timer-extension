import React from "react";
import ReactDOM from "react-dom/client";

const tab = () => {
  return (
    <>
      <div className="tab-video">
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/o7kQaJQN2J4?si=AcwFOA-9EbbajwK3" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
};

export default tab;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(tab));
