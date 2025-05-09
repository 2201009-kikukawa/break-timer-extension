import { WebviewView, window } from "vscode";
import { EventTypes } from "../types/classNames";

export class EventListener {
  public setWebviewMessageListener(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage((message: {type: EventTypes, text: string}) => {
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