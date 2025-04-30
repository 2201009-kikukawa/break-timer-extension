import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

const main = () => {
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [minError, setMinError] = useState(false);
  const [hourError, setHourError] = useState(false);
  const [error, setError] = useState("");

  const checkHourValidate = (e: any) => {
    const newValue = e.target.value;
    setHour(newValue);

    if (!/^\d*$/.test(newValue)) { return setHourError(true); }

    setHourError(false);
  };

  const checkMinValidate = (e: any) => {
    const newValue = e.target.value;
    setMinutes(newValue);

    if (!/^\d*$/.test(newValue)) { return setMinError(true); }

    setMinError(false);
  };

  // hour, minuteともにエラーがなければ送信
  const checkValidate = () => {
    if (hourError || minError) {
      hourError ? setHour("") : "";
      minError ? setMinutes("") : "";
      return setError("数字を入力してください");
    }

    setError("");
  };

  return (
    <>
      <p>タイマーを設定</p>
      <div className="content-wrap">
        <VSCodeTextField placeholder="hour" className="vscode-text-field" value={hour} oninput={checkHourValidate} />
        <span className="textfield-span">:</span>
        <VSCodeTextField placeholder="minutes" className="vscode-text-field" value={minutes} oninput={checkMinValidate} />
      </div>
      <VSCodeButton className="vscode-button" onclick={checkValidate}>START</VSCodeButton>
      {error && (
        <span className="error">{error}</span>
      )}
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
