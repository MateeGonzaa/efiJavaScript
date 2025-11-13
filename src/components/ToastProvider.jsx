import React, { createRef } from "react";
import { Toast } from "primereact/toast";

export const toastRef = createRef();

export const showSuccess = (summary, detail) =>
  toastRef.current?.show({ severity: "success", summary, detail, life: 3000 });

export const showError = (summary, detail) =>
  toastRef.current?.show({ severity: "error", summary, detail, life: 3000 });

export default function ToastProvider() {
  return <Toast ref={toastRef} position="top-right" />;
}
