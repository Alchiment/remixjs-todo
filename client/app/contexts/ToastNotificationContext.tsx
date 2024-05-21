import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import { ToastNotificationInterface, ToastNotificationModel } from '~/models/toast-notification.model';
import {ToastNotification} from "~/components/notifications/ToastNotification";


export interface ToastNotificationContextProps {
  setToastState: Dispatch<SetStateAction<ToastNotificationInterface>>;
}

export const ToastNotificationContext = createContext<ToastNotificationContextProps>(
    {setToastState: () => (new ToastNotificationModel())}
);

export const ToastNotificationProvider = ({ children }: any) => {
  const [toastState, setToastState] = useState<ToastNotificationInterface>(new ToastNotificationModel());

  function onCloseNotification() {
    setToastState(new ToastNotificationModel());
  }

  return (
    <ToastNotificationContext.Provider value={{ setToastState }}>
      <ToastNotification
        show={toastState.show}
        message={toastState.message}
        title={toastState.title}
        variation={toastState.variation}
        onClose={onCloseNotification}
      />
      {children}
    </ToastNotificationContext.Provider>
  );
};