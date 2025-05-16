import { ExtensionContext, window } from "vscode";
import { ViewProvider } from "./providers/SidebarProvider";

export function activate(context: ExtensionContext) {
  const provider = new ViewProvider(context.extensionUri);

  const sampleViewDisposable = window.registerWebviewViewProvider(ViewProvider.viewType, provider);

  context.subscriptions.push(sampleViewDisposable);
}
