import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationContextProps {
  notify: (type: NotificationType, options: unknown) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (type: NotificationType, options: ArgsProps) => {
    api[type](options);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotify must be used within a NotificationProvider');
  }
  return context.notify;
};
