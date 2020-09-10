import { AddToast, RemoveToast, AppearanceTypes } from "react-toast-notifications";
import { ReactNode } from "react";

interface ToastHooksProps {
  addToast: AddToast;
  removeToast: RemoveToast;
  toastStack: Array<{
    content: ReactNode;
    id: string;
    appearance: AppearanceTypes;
  }>;
}
class ToastHelper {
  private addToast: AddToast
  constructor(props: ToastHooksProps) {
    this.addToast = props.addToast;
  }

  success = (message: string) => this.addToast(message, { appearance: 'success', autoDismiss: true });
  error = (message: string) => this.addToast(message, { appearance: 'error', autoDismiss: true });
  info = (message: string) => this.addToast(message, { appearance: 'info', autoDismiss: true });
  warning = (message: string) => this.addToast(message, { appearance: 'warning', autoDismiss: true });
}

export default ToastHelper;