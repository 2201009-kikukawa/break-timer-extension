import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

// VSCode API使用
declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
};
const vscode = acquireVsCodeApi();

const main = () => {
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hourError, setHourError] = useState("");
  const [minError, setMinError] = useState("");

  const checkHourValidate = (e: any) => {
    const newValue = e.target.value;
    setHour(newValue);

    if (!/^\d*$/.test(newValue)) { return setHourError("時間：数字のみを入力してください"); }

    setHourError("");
  };

  const checkMinValidate = (e: any) => {
    const newValue = e.target.value;
    setMinutes(newValue);

    if (!/^\d*$/.test(newValue)) { return setMinError("分：数字のみを入力してください"); }

    setMinError("");
  };

  const checkValidate = () => {
    if (!(hourError || minError) && (hour && minutes)) {
      // タイマー開始処理
      vscode.postMessage({
        type: 'showModal',
        text: 'メッセージ'
      });
      return;
    }
    hourError ? setHour("") : "";
    minError ? setMinutes("") : "";
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
      <VSCodeButton className="vscode-button" onClick={checkValidate}>START</VSCodeButton>
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
