import {Modal} from "react-bootstrap";
import ButtonStandard from "~/components/buttons/button-standard/ButtonStandard";

interface DeleteConfirmModalInterface {
    show: boolean;
    onClose(): void;
    onConfirm(): void;
    title?: string;
    message?: string;
    html?: { __html: string };
    btnDeleteText?: string;
    btnCancelText?: string;
    deleting?: boolean;
}
export default function DeleteConfirmModal({ show, onClose, onConfirm, title, message, deleting, html, btnDeleteText, btnCancelText }: DeleteConfirmModalInterface) {
    return <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                {title || 'Delete confirmation'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {html && <div dangerouslySetInnerHTML={html}></div>}
            {message && message}
        </Modal.Body>
        <Modal.Footer>
            <ButtonStandard variation="info" onClick={onClose}>
                {btnCancelText || 'Cancel'}
            </ButtonStandard>
            <ButtonStandard disabled={deleting}
                            showSpinner={deleting}
                            variation="danger"
                            onClick={onConfirm}>
                {btnDeleteText || 'Delete'}
            </ButtonStandard>
        </Modal.Footer>
    </Modal>
}