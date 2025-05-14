import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { EventListenerProps, EventTypes } from "../types/classNames";
import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

// VSCode API使用
declare const acquireVsCodeApi: () => {
  postMessage: (message: EventListenerProps) => void;
};
const vscode = acquireVsCodeApi();

const main = () => {
  // 初期状態
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // 入力
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  // エラー
  const [hourError, setHourError] = useState("");
  const [minError, setMinError] = useState("");

  useEffect(() => {
    vscode.postMessage({
      type: EventTypes.init,
      text: ''
    });

    const handleMessage = (event: MessageEvent) => {
      const { type, running, time } = event.data;

      if (type === EventTypes.init) { // 状態チェック
        setIsRunning(running);
        setSeconds(time);
      } else if (type === EventTypes.pauseTimer) {  // 残り時間格納
        setSeconds(time);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 入力値チェック
  const checkHourValidate = (e: any) => {
    const newValue = e.target.value;
    setHours(newValue);

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
    if (seconds > 0) {
      handleRestart();
    } else if (!(hourError || minError) && (hours && minutes)) {
      handleStart();
    }

    if (hourError) { setHours(''); }
    if (minError) { setMinutes(''); }
  };

  // スタート
  const handleStart = () => {
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    const secs = h * 3600 + m * 60;

    vscode.postMessage({
      type: EventTypes.startTimer,
      text: secs.toString()
    });

    setIsRunning(true);
  };

  // 一時停止
  const handlePause = () => {
    vscode.postMessage({
      type: EventTypes.pauseTimer,
      text: ''
    });

    setIsRunning(false);
  };

  // リスタート
  const handleRestart = () => {
    vscode.postMessage({
      type: EventTypes.restartTimer,
      text: seconds.toString()
    });

    setIsRunning(true);
  };

  // 停止
  const handleStop = () => {
    vscode.postMessage({
      type: EventTypes.clearTimer,
      text: ''
    });

    setHours('');
    setMinutes('');
    setIsRunning(false);
  };

  return (
    <>
      <div>
        <h3>作業時間を設定</h3>

        <div className="content-wrap">
          <VSCodeTextField placeholder="時間" className="vscode-text-field" value={hours} oninput={checkHourValidate} />
          <span className="textfield-span">:</span>
          <VSCodeTextField placeholder="分" className="vscode-text-field" value={minutes} oninput={checkMinValidate} />
        </div>

        {hourError && (
          <p className="error">{hourError}</p>
        )}
        {minError && (
          <p className="error">{minError}</p>
        )}

        <div className="vscode-button-wrap">
          {isRunning ?
            <VSCodeButton className="vscode-button" onclick={handlePause}>一時停止</VSCodeButton> :
            <VSCodeButton className="vscode-button" onclick={checkValidate}>スタート</VSCodeButton>
          }

          <VSCodeButton className="vscode-button" appearance="secondary" onClick={handleStop}>終了</VSCodeButton>
        </div>
      </div >
    </>
  );
};

export default main;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(main));
