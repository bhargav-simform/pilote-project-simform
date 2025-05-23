import React from "react";
import { Drawer as AntDrawer } from "antd";

interface CommonDrawerProps {
  title?: React.ReactNode;
  width?: number | string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  destroyOnClose?: boolean;
  closable?: boolean;
  placement?: "left" | "right" | "top" | "bottom";
  maskClosable?: boolean;
}

const Drawer: React.FC<CommonDrawerProps> = ({
  title,
  width = 480,
  open,
  onClose,
  children,
  footer,
  destroyOnClose = true,
  closable = true,
  placement = "right",
  maskClosable = true,
}) => {
  return (
    <AntDrawer
      title={title}
      width={width}
      open={open}
      onClose={onClose}
      destroyOnClose={destroyOnClose}
      closable={closable}
      placement={placement}
      maskClosable={maskClosable}
      footer={footer}
    >
      {children}
    </AntDrawer>
  );
};

export default Drawer;
