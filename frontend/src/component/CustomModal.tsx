
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmModalProps {
  show: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string; // 예: "Confirm" 또는 "Delete"
  cancelLabel?: string;  // 예: "Cancel"
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
    show, 
    title = "Confirm", 
    message,
    onConfirm, 
    onCancel, 
    confirmLabel = "Confirm",
    cancelLabel = "Cancel", }) => {
    const CustomModalHeader: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
        <Modal.Header closeButton {...({} as any)}>{children}</Modal.Header>
    )
    return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton {...({} as any)}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button 
        variant={confirmLabel.toLowerCase() === "delete" ? "danger" : "success"}
        onClick={onConfirm}
        >
        {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
