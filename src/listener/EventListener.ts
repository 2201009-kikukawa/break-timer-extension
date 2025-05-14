import { WebviewView, window } from "vscode";
import * as vscode from "vscode";
import { EventListenerProps, EventTypes } from "../types/classNames";

let statusBarItem: vscode.StatusBarItem;  // ステータスバー管理
let countdownTimer: NodeJS.Timeout | undefined; // タイマー管理
let remainingSeconds = 0; // 残り秒数
let isRunning = false;  // true: タイマー動作中, false: タイマー停止中

// タイマー開始
function startCountdown(seconds: number) {
  clearInterval(countdownTimer);
  remainingSeconds = seconds;
  isRunning = true;

  updateStatusBar(remainingSeconds);

  // カウントダウン
  countdownTimer = setInterval(() => {
    remainingSeconds--;
    updateStatusBar(remainingSeconds);

    // タイマーが0になったらモーダル表示
    if (remainingSeconds <= 0) {
      clearInterval(countdownTimer);
      const selection = window.showInformationMessage(
        'おつかれさまでした！休憩中にストレッチをしませんか？',
        { modal: true },
        "ストレッチをする"
      );

      // ステータスバー非表示
      clearStatusBar();
      isRunning = false;
    }
  }, 1000);
}

// 一時停止
function pauseCountDown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    isRunning = false;
  }
}

// 終了
function stopCountDown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  remainingSeconds = 0;
  clearStatusBar();
  isRunning = false;

  // 終了した旨を通知
  const selection = window.showInformationMessage('タイマーを停止しました');
}

// ステータスバー更新
function updateStatusBar(seconds: number) {
  // ステータスバーが存在しなければ作成
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  }

  // ステータスバー表示
  statusBarItem.show();

  // 残り時間表示
  const hours = Math.floor(seconds / 60);
  const minutes = seconds % 60;
  statusBarItem.text = `$(clock) ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// ステータスバー非表示
function clearStatusBar() {
  if (statusBarItem) {
    statusBarItem.hide();
  }
}


export class EventListener {
  public setWebviewMessageListener(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage((message: EventListenerProps) => {
      const type = message.type;
      const text = message.text;

      if (type === EventTypes.init) {
        // 初期状態をReactに送信
        webviewView.webview.postMessage({
          type: EventTypes.init,
          running: isRunning,
          time: remainingSeconds
        });
      } else if (type === EventTypes.startTimer) {
        startCountdown(parseInt(text));
      } else if (type === EventTypes.pauseTimer) {
        pauseCountDown();

        // 現在の値をReactに送信
        webviewView.webview.postMessage({
          type: EventTypes.pauseTimer,
          running: isRunning,
          time: remainingSeconds
        });
      } else if (type === EventTypes.restartTimer) {
        startCountdown(parseInt(text));
      } else if (type === EventTypes.clearTimer) {
        stopCountDown();
      }
    });
  }
}