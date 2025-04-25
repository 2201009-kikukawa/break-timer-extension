import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

const main = () => {
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [minError, setMinError] = useState("");
  const [hourError, setHourError] = useState("");

  const checkHourValidate = (e: any) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setHour(newValue);
      setHourError("");
    } else {
      setHourError("hour: 数字のみを入力してください");
    }
  };

  const checkMinValidate = (e: any) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setMinutes(newValue);
      setMinError("");
    } else {
      setMinError("minutes: 数字のみを入力してください");
    }
  };

  return (
    <>
      <p>タイマーを設定</p>
      <div className="content-wrap">
        <VSCodeTextField placeholder="hour" className="vscode-text-field" value={hour} oninput={checkHourValidate} />
        <span className="textfield-span">:</span>
        <VSCodeTextField placeholder="minutes" className="vscode-text-field" value={minutes} oninput={checkMinValidate} />
      </div>
      {hourError && (
        <span className="error">{hourError}</span>
      )}
      {minError && (
        <span className="error">{minError}</span>
      )}
      <VSCodeButton className="vscode-button">START</VSCodeButton>
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
