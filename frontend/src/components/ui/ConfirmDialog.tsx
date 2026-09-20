import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, isLoading }: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-2">
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
