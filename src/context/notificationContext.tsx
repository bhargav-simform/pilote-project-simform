import React, { createContext, useCallback, useContext, useMemo } from "react";
import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationContextProps {
  notify: (type: NotificationType, options: ArgsProps) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(
  null,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = useCallback(
    (type: NotificationType, options: ArgsProps) => {
      api[type](options);
    },
    [api],
  );

  const contextValue = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotificationProvider");
  }
  return context.notify;
};
