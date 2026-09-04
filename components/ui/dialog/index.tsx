"use client";

import { Modal, ModalProps } from "../modal";
import { Button } from "../button";

export interface DialogProps extends Omit<ModalProps, "footer"> {
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "danger";
}

export function Dialog({
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  variant = "primary",
  onClose,
  children,
  ...props
}: DialogProps) {
  const footer = (
    <>
      <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button
        variant={variant === "danger" ? "danger" : "primary"}
        size="sm"
        onClick={onConfirm}
        isLoading={isLoading}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal onClose={onClose} footer={footer} {...props}>
      {children}
    </Modal>
  );
}
