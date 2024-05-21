import React from "react";

type ToastTypes = 'success'|'danger'|'warning'|'info';

export interface ToastNotificationInterface {
    title: string;
    message?: string | React.ReactNode;
    show: boolean;
    onClose?(): void;
    variation: ToastTypes;
}

export class ToastNotificationModel implements ToastNotificationInterface {
    public message: string | React.ReactNode = '';
    public show: boolean = false;
    public title: string = '';
    public variation: ToastTypes = 'info';

    constructor(toast?: ToastNotificationInterface) {
        this.message = toast?.message || '';
        this.show = toast?.show || false;
        this.title = toast?.title || '';
        this.variation = toast?.variation || 'info';
    }
}
