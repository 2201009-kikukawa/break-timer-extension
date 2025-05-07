import { WebviewView, window } from "vscode";
import { EVENT_TYPES, EventType } from "../types/classNames";

export class EventListener {
  public setWebviewMessageListener(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage((message: EventType) => {
      const type = message.type;
      const text = message.text;

      if (type === EVENT_TYPES.showModal.type) {
        const selection = window.showInformationMessage (
          text,
          { modal: true },
          "OK"
        );
      }
    });
  }
}