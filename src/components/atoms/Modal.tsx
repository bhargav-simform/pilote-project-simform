import React from 'react';
import { Modal as AntModal } from 'antd';

interface CommonModalProps {
  title?: React.ReactNode;
  open: boolean;
  onOk?: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  okText?: string;
  cancelText?: string;
  children: React.ReactNode;
  footer?: React.ReactNode | null;
  width?: number | string;
  destroyOnClose?: boolean;
  closable?: boolean;
  centered?: boolean;
  maskClosable?: boolean;
}

interface ModalWithStatics extends React.FC<CommonModalProps> {
  confirm: typeof AntModal.confirm;
  info: typeof AntModal.info;
  success: typeof AntModal.success;
  error: typeof AntModal.error;
  warning: typeof AntModal.warning;
}

const ModalComponent: React.FC<CommonModalProps> = ({
  title,
  open,
  onOk,
  onCancel,
  confirmLoading = false,
  okText = 'OK',
  cancelText = 'Cancel',
  children,
  footer,
  width = 520,
  destroyOnClose = true,
  closable = true,
  centered = true,
  maskClosable = true,
}) => {
  return (
    <AntModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText={okText}
      cancelText={cancelText}
      footer={footer}
      width={width}
      destroyOnClose={destroyOnClose}
      closable={closable}
      centered={centered}
      maskClosable={maskClosable}
    >
      {children}
    </AntModal>
  );
};

// Add static methods
const Modal = ModalComponent as ModalWithStatics;
Modal.confirm = AntModal.confirm;
Modal.info = AntModal.info;
Modal.success = AntModal.success;
Modal.error = AntModal.error;
Modal.warning = AntModal.warning;

export default Modal;
