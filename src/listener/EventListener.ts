import { WebviewView, window } from "vscode";
import { EventListenerProps, EventTypes } from "../types/classNames";

export class EventListener {
  public setWebviewMessageListener(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage((message: EventListenerProps) => {
      const type = message.type;
      const text = message.text;

      if (type === EventTypes.showModal) {
        const selection = window.showInformationMessage (
          text,
          { modal: true },
          "OK"
        );
      }
    });
  }
}