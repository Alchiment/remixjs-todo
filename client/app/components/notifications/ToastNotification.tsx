import { Toast, ToastContainer} from "react-bootstrap";
import {ToastNotificationInterface} from "~/models/toast-notification.model";

export function ToastNotification({ show, onClose, message, title, variation = 'info' }: ToastNotificationInterface) {
    return <ToastContainer position="bottom-end" className="m-2">
        <Toast show={show} onClose={onClose} bg={variation}>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body className="bg-white">
                {message}
            </Toast.Body>
        </Toast>
    </ToastContainer>
}